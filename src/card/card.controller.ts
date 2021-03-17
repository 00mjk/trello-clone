import { Controller, Delete, Get, UseGuards ,Request, Post, Body, Put} from '@nestjs/common';
import {ApiBody,ApiBearerAuth,ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardTrello } from './entity/card.entity';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

@Controller('/')
export class CardController {

    constructor(
        @InjectRepository(CardTrello)
        private cardRepository: Repository<CardTrello>){}

    @UseGuards(JwtAuthGuard)
    @Get("/")
    getAllCards(@Request() req){
        return this.cardRepository.getCards(req.user.userId,req.params.id,req.params.column_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:card_id")
    getCard(@Request() req){
        return this.cardRepository.getOneCard(req.user.userId,req.params.id,req.params.column_id,req.params.card_id)
    }


    @ApiBody({ type: [CreateCardDto] })
    @UseGuards(JwtAuthGuard)
    @Post("/")
    createCard(@Request() req,@Body(new ValidationPipe()) body: CreateCardDto){
        return this.cardRepository.createCards(req.user.userId,req.params.id,req.params.column_id,body)
    }


    @ApiBody({ type: [UpdateCardDto] })
    @UseGuards(JwtAuthGuard)
    @Put("/:card_id/edit")
    updateCard(@Request() req,@Body(new ValidationPipe()) body: UpdateCardDto){
        return this.cardRepository.updateCards(req.user.userId,req.params.id,req.params.column_id,body)
    }


    @UseGuards(JwtAuthGuard)
    @Delete(":id/column/:column_id/cards/:card_id/remove")
    deleteCard(@Request() req){
        return this.cardRepository.deleteCard(req.user.userId,req.params.id,req.params.column_id,req.params.card_id)
    }
}
