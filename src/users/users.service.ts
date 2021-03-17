import { BadRequestException, Get, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ColumnTrello } from '../column/entity/column.entity';
import { CreateColumnDto } from '../column/dto/create-column.dto';
import { GetProfileDto } from './dto/get-profile.dto';
import { User } from './entity/users.entity';
import { UpdateColumnDto } from '../column/dto/update-column.dto';
import { CardTrello } from '../card/entity/card.entity';
import { CreateCardDto } from '../card/dto/create-card.dto';
import { UpdateCardDto } from '../card/dto/update-card.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ColumnTrello)
    private columnRepository: Repository<ColumnTrello>,
    @InjectRepository(CardTrello)
    private cardRepository: Repository<CardTrello>
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

  private async validateUser(userId?: string, paramId?: string): Promise<User> {
    if (userId !== paramId) {
      throw new UnauthorizedException("Unathorized")
    }
    const user = await this.usersRepository.findOne({ id: userId })
    return user;

  }

  async getUserInfo(userId?: string, paramId?: string): Promise<GetProfileDto> {
    const user = await this.validateUser(userId, paramId)
    return new GetProfileDto(user.username, user.email, user.id)

  }

  //columns 

  async createColumn(userId?: string, paramId?: string, createColumnDto?: CreateColumnDto): Promise<void> {
    const user = await this.validateUser(userId, paramId)
    await this.columnRepository.save({ user: user, name: createColumnDto.name })
  }



  async getColumns(userId?: string, paramId?: string): Promise<ColumnTrello[]> {
    const user = await this.validateUser(userId, paramId)
    const columns = await this.columnRepository.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    })
    return columns
  }

  async getOneColumn(userId?: string, paramId?: string, columnId?: string): Promise<ColumnTrello> {
    const user = await this.validateUser(userId, paramId)
    const column = await this.columnRepository.findOne({
      
      where: {user: {id: user.id },id: columnId,}
    })
    return column
  }

  async updateColumn(userId?: string, paramId?: string, updateColumnDto?: UpdateColumnDto): Promise<void> {
    const user = await this.validateUser(userId, paramId)
    let column = await this.getOneColumn(userId,paramId,updateColumnDto.id)
    column.name = updateColumnDto.name

    await this.columnRepository.save(column)
  }

  async removeColumn(userId?: string, paramId?: string, columnId?: string): Promise<void> {
    await this.validateUser(userId, paramId)
    let column = await this.getOneColumn(userId,paramId,columnId)
    await this.columnRepository.delete(column)
  }


  // Cards

  async getCards(userId?: string, paramId?: string, columnId?: string): Promise<CardTrello[]> {
    const column = await this.getOneColumn(userId,paramId,columnId)
    return await this.cardRepository.find({
      relations: ['column'],
      where: { column: { id: column.id } },
    })
  }

  async getOneCard(userId?: string, paramId?: string, columnId?: string,cardId?:string) :Promise<CardTrello> {
    const column = await this.getOneColumn(userId,paramId,columnId)
    const card = await this.cardRepository.findOne({
      
      where: {column: {id: column.id },id: cardId,}
    })
    return card
  }

  async createCards(userId?:string ,paramId?:string,columnId?:string,createCardDto?: CreateCardDto): Promise<void> {
    const column = await this.getOneColumn(userId,paramId,columnId)
     await this.cardRepository.save({column,name:createCardDto.name})
  }

  async updateCards(userId?:string ,paramId?:string,columnId?:string,updateCardDto?: UpdateCardDto): Promise<void> {
    const column = await this.getOneColumn(userId,paramId,columnId)
    let card = await this.getOneCard(userId,paramId,column.id,updateCardDto.id)
    card.name = updateCardDto.name
    await this.cardRepository.save(card)
  }

  async deleteCard(userId?: string, paramId?: string, columnId?: string,cardId?:string): Promise<void> {
    const column = await this.getOneColumn(userId,paramId,columnId)
    let card = await this.getOneCard(userId,paramId,column.id,cardId)
    await this.cardRepository.delete(card)
  }
}