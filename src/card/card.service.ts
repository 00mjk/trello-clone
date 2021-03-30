import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnTrello } from '../column/entity/column.entity';
import { CreateCardDto } from './dto/card.dto';
import { CardTrello } from './entity/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardTrello)
    private cardRepository: Repository<CardTrello>,
  ) {}

  async findByColumnId(columnId: string): Promise<CardTrello[]> {
    return await this.cardRepository.find({
      where: { column: { id: columnId } },
    });
  }

  async findOne(columnId: string, cardId: string): Promise<CardTrello | null> {
    return await this.cardRepository.findOne({
      where: {
        column: { id: columnId },
        id: cardId,
      },
    });
  }

  async save(createCardDto: CreateCardDto,userId: string): Promise<CardTrello> {
    return await this.cardRepository.save({
      column: { id: createCardDto.columnId },
      name: createCardDto.name,
      userId
    });
  }

  async update(
    cardId: string,
    createCardDto: CreateCardDto,
  ): Promise<CardTrello> {
    let card = await this.findOne(createCardDto.columnId, cardId);
    card.name = createCardDto.name;

    return await this.cardRepository.save(card);
  }

  async remove(columnId: string, cardId: string): Promise<CardTrello> {
    const card = await this.findOne(columnId, cardId);
    await this.cardRepository.delete({
      column: { id: columnId },
      id: cardId,
    });
    return card;
  }
}
