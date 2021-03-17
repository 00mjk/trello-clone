import { BadRequestException, Get, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { ColumnTrello } from '../column/entity/column.entity';
import { CreateColumnDto } from '../column/dto/create-column.dto';
import { GetProfileDto } from './dto/get-profile.dto';
import { User } from './entity/users.entity';
import { UpdateColumnDto } from '../column/dto/update-column.dto';
import { CardTrello } from '../card/entity/card.entity';
import { CreateCardDto } from '../card/dto/create-card.dto';
import { UpdateCardDto } from '../card/dto/update-card.dto';
import { CommentTrello } from '../comment/entity/comment.entity';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ColumnTrello)
    private columnRepository: Repository<ColumnTrello>,
    @InjectRepository(CardTrello)
    private cardRepository: Repository<CardTrello>,
    @InjectRepository(CommentTrello)
    private commentRepository: Repository<CommentTrello>
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

  // Cards

  async getAllComments(userId?: string, paramId?: string, columnId?: string,cardId?:string): Promise<CommentTrello[]> {
    const card = await this.getOneCard(userId,paramId,columnId,cardId)
    const comments = await this.commentRepository.find({
      relations: ['card'],
      where: { card: { id: card.id } },
    })
    return comments;
  }

  async getComment(userId?: string, paramId?: string, columnId?: string,cardId?:string,commentId?:string): Promise<CommentTrello> {
    const card = await this.getOneCard(userId,paramId,columnId,cardId)
    const comment = await this.commentRepository.findOne({
      where: {card: {id: card.id },id: commentId,}
    })
    return comment;
  }

  async createComment(userId?: string, paramId?: string, columnId?: string,cardId?:string,createCommentDto?:CreateCommentDto): Promise<void> {
    const card = await this.getOneCard(userId,paramId,columnId,cardId)
    await this.commentRepository.save({card,name:createCommentDto.name,description:createCommentDto.description})
  }

  async updateComment(userId?: string, paramId?: string, columnId?: string,cardId?:string,updateCommentDto?:UpdateCommentDto): Promise<void> {
    let comment = await this.getComment(userId,paramId,columnId,cardId,updateCommentDto.id)
    comment.description = updateCommentDto.description
    comment.name = updateCommentDto.name
    await this.commentRepository.save(comment)
  }

  async deleteComment(userId?: string, paramId?: string, columnId?: string,cardId?:string,commentId?:string): Promise<void> {
    const comment = await this.getComment(userId,paramId,columnId,cardId,commentId)
    await this.cardRepository.delete(comment)
  }
}