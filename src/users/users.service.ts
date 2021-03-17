import { BadRequestException, Get, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnTrello } from '../column/entity/column.entity';
import { CreateColumnDto } from '../column/dto/create-column.dto';
import { GetProfileDto } from './dto/get-profile.dto';
import { User } from './entity/users.entity';
import { UpdateColumnDto } from '../column/dto/update-column.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ColumnTrello)
    private columnRepository: Repository<ColumnTrello>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ email })
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async save(email?: string, pass?: string, username?: string): Promise<void> {
    await this.usersRepository.save({ email, pass, username })
  }

  private async getUserProfile(userId?: string, paramId?: string): Promise<User> {
    if (userId !== paramId) {
      throw new UnauthorizedException("Unathorized")
    }
    const user = await this.usersRepository.findOne({ id: userId })
    return user;

  }

  async getUserInfo(userId?: string, paramId?: string): Promise<GetProfileDto> {
    const user = await this.getUserProfile(userId, paramId)
    return new GetProfileDto(user.username, user.email, user.id)

  }

  async createColumn(userId?: string, paramId?: string, createColumnDto?: CreateColumnDto): Promise<void> {
    const user = await this.getUserProfile(userId, paramId)
    await this.columnRepository.save({ user: user, name: createColumnDto.name })
  }



  async getColumns(userId?: string, paramId?: string): Promise<ColumnTrello[]> {
    const user = await this.getUserProfile(userId, paramId)
    const columns = await this.columnRepository.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    })
    return columns
  }

  async getOneColumn(userId?: string, paramId?: string, columnId?: string): Promise<ColumnTrello> {
    const user = await this.getUserProfile(userId, paramId)
    const column = await this.columnRepository.findOne({
      
      where: {user: {id: user.id },id: columnId,}
    })
    return column
  }

  async updateColumn(userId?: string, paramId?: string, updateColumnDto?: UpdateColumnDto): Promise<void> {
    const user = await this.getUserProfile(userId, paramId)
    let column = await this.getOneColumn(userId,paramId,updateColumnDto.id)
    column.name = updateColumnDto.name

    await this.columnRepository.save(column)
  }

  async removeColumn(userId?: string, paramId?: string, columnId?: string): Promise<void> {
    const user = await this.getUserProfile(userId, paramId)
    let column = await this.getOneColumn(userId,paramId,columnId)
    await this.columnRepository.delete(column)
  }
}