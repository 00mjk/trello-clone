import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnTrello } from '../column/entity/column.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { CardTrello } from './entity/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardTrello)
    private cardRepository: Repository<CardTrello>,
  ) {}

  async findAll(columnId: string): Promise<CardTrello[]> {
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

  async save(
    columnId: string,
    createCardDto: CreateCardDto,
  ): Promise<CardTrello> {
    return await this.cardRepository.save({
      column: { id: columnId },
      name: createCardDto.name,
    });
  }

  async update(
    columnId: string,
    cardId: string,
    createCardDto: CreateCardDto,
  ): Promise<CardTrello> {
    let card = await this.findOne(columnId, cardId);
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
