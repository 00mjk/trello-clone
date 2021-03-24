import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardTrello } from './entity/card.entity';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardTrello)
        private cardRepository: Repository<CardTrello>){}

}
