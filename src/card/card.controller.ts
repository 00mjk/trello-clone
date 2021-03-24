import { Controller, Delete, Get, UseGuards ,Request, Post, Body, Put} from '@nestjs/common';
import { userInfo } from 'os';
import { Column } from '../shared/decorators/column.decorator';
import { User } from '../shared/decorators/user.decorator';
import { JwtAuthGuard } from '../shared/guards/auth.guard';
import { CardOwnerGuard } from '../shared/guards/card-owner.guard';
import { CardService } from './card.service';

@UseGuards(JwtAuthGuard,CardOwnerGuard)
@Controller('card')
export class CardController {

    constructor(private readonly cardService: CardService){}
   
    @Get()
    getCards(@User() user,@Column() column){
        
        this.cardService.findAll(column.id)
    }
}
