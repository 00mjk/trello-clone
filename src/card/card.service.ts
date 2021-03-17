import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardTrello } from './entity/card.entity';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardTrello)
        private cardRepository: Repository<CardTrello>){}

        async getCards(userId?: string, paramId?: string, columnId?: string): Promise<CardTrello[]> {
            return await this.cardRepository.find({
              relations: ['column'],
              where: { column: { id: column.id } },
            })
          }
        
          async getOneCard(userId?: string, paramId?: string, columnId?: string,cardId?:string) :Promise<CardTrello> {
        
            const card = await this.cardRepository.findOne({
              
              where: {column: {id: column.id },id: cardId,}
            })
            return card
          }
        
          async createCards(userId?:string ,paramId?:string,columnId?:string,createCardDto?: CreateCardDto): Promise<void> {
            
             await this.cardRepository.save({column,name:createCardDto.name})
          }
        
          async updateCards(userId?:string ,paramId?:string,columnId?:string,updateCardDto?: UpdateCardDto): Promise<void> {
           
            let card = await this.getOneCard(userId,paramId,column.id,updateCardDto.id)
            card.name = updateCardDto.name
            await this.cardRepository.save(card)
          }
        
          async deleteCard(userId?: string, paramId?: string, columnId?: string,cardId?:string): Promise<void> {
           
            let card = await this.getOneCard(userId,paramId,column.id,cardId)
            await this.cardRepository.delete(card)
          }
}
