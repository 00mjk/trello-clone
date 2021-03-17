import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/users.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnTrello } from './entity/column.entity';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnTrello)
        private columnRepository: Repository<ColumnTrello>){}
    
  async createColumn(user:User,createColumnDto?: CreateColumnDto): Promise<void> {
    await this.columnRepository.save({ user: user, name: createColumnDto.name })
  }



  async getColumns(userId?: string, paramId?: string): Promise<ColumnTrello[]> {
    const columns = await this.columnRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    })
    return columns
  }

  async getOneColumn(userId?: string, paramId?: string, columnId?: string): Promise<ColumnTrello> {
    const column = await this.columnRepository.findOne({
      
      where: {user: {id: userId },id: columnId,}
    })
    return column
  }

  async updateColumn(userId?: string, paramId?: string, updateColumnDto?: UpdateColumnDto): Promise<void> {
    let column = await this.getOneColumn(userId,paramId,updateColumnDto.id)
    column.name = updateColumnDto.name

    await this.columnRepository.save(column)
  }

  async removeColumn(userId?: string, paramId?: string, columnId?: string): Promise<void> {
    let column = await this.getOneColumn(userId,paramId,columnId)
    await this.columnRepository.delete(column)
  }


}
