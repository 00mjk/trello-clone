import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnTrello } from './entity/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnTrello)
    private columnRepository: Repository<ColumnTrello>,
  ) {}

  async findOne(
    userId: string,
    columnId: string,
  ): Promise<ColumnTrello | null> {
    return await this.columnRepository.findOne({
      relations: ['user'],
      where: { user: { id: userId }, id: columnId },
    });
  }

  async findAll(userId: string): Promise<ColumnTrello[]> {
    return await this.columnRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  async save(
    userId: string,
    createColumnDto: CreateColumnDto,
  ): Promise<ColumnTrello> {
    return await this.columnRepository.save({
      user: { id: userId },
      userId,
      name: createColumnDto.name,
    });
  }

  async remove(userId: string, columnId: string): Promise<ColumnTrello> {
    const column = await this.findOne(userId, columnId);
    await this.columnRepository.delete({
      user: { id: userId },
      id: columnId,
    });
    return column;
  }

  async update(
    userId: string,
    columnId: string,
    updateColumnDto: CreateColumnDto,
  ): Promise<ColumnTrello> {
    let column = await this.findOne(userId, columnId);
    column.name = updateColumnDto.name;

    return await this.columnRepository.save({
      user: { id: userId },
      name: updateColumnDto.name,
    });
  }
}
