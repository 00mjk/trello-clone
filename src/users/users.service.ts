import { BadRequestException, Get, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Repository } from 'typeorm';
import { ColumnTrello } from '../entity/column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { GetProfileDto } from './dto/get-profile.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ColumnTrello)
    private columnRepository: Repository<ColumnTrello>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string) : Promise<User> {
    return this.usersRepository.findOne({email})
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async save(email?: string,pass?: string,username?: string):Promise<void> {
    await this.usersRepository.save({email,pass,username})
  }

  private async getUserProfile(userId?: string,paramId?:string): Promise<User>{
    if(userId !== paramId){
      throw new UnauthorizedException("Unathorized")
    }
    const user = await this.usersRepository.findOne({id: userId})
    return user;
    
  }

  async getUserInfo(userId?: string,paramId?:string): Promise<GetProfileDto>{
    const user = await this.getUserProfile(userId,paramId)
    return new GetProfileDto(user.username,user.email,user.id)
    
  }

  async createColumn(userId?: string,paramId?:string,createColumnDto?: CreateColumnDto): Promise<void> {
    const user = await this.getUserProfile(userId,paramId)
    await this.columnRepository.save({user:user,name:createColumnDto.name})
  }


  private async getAllColumn(user: User): Promise<ColumnTrello[]>{
    return this.columnRepository.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    })
  }

  async getUserColumns(userId?:string,paramId?:string): Promise<ColumnTrello[]>{
    const user = await this.getUserProfile(userId,paramId)
    const columns = await this.getAllColumn(user)
    return columns
  }
}