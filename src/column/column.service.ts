import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnTrello } from './entity/column.entity';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnTrello)
        private columnRepository: Repository<ColumnTrello>){}
    
      async findOne(userId: string,columnId: string) : Promise<ColumnTrello|null> {
        return await this.columnRepository.findOne({
          relations: ['user'],
          where: { user: { id: userId}, id:columnId}
        })
      }

      async findAll(userId: string): Promise<ColumnTrello[]> {
        return await this.columnRepository.find({
          relations: ['user'],
          where: { user: { id: userId}}
        })
      }

      async save(userId: string,createColumnDto: CreateColumnDto):Promise<void>{
        // REVU: Лучше писать { user: { id: userId }, ...CreateColumnDto }
        await this.columnRepository.save({
          user:{id: userId},
          name: createColumnDto.name
        })
      }

      async remove(userId: string,columnId: string): Promise<void> {
        await this.columnRepository.delete({
          user: {id: userId},
          id: columnId
        })
      }

      async update(userId: string,columnId: string, updateColumnDto: CreateColumnDto): Promise<void> {
        // REVU: Зачем это здесь? Кажется это можно убрать и ничего не изменится.
        let column = await this.findOne(userId,columnId)
        column.name = updateColumnDto.name

        // REVU: можно написать просто .save({ id: columnId, ...updateColumnDto })
        await this.columnRepository.save({
          user:{id: userId},
          name: updateColumnDto.name
        })
      }
}
