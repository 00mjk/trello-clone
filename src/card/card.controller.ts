import { Controller, Delete, Get, UseGuards ,Request, Post, Body, Put, ValidationPipe, Param} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userInfo } from 'os';
import { Column } from '../shared/decorators/column.decorator';
import { User } from '../shared/decorators/user.decorator';
import { JwtAuthGuard } from '../shared/guards/auth.guard';
import { CardOwnerGuard } from '../shared/guards/card-owner.guard';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';


@ApiBearerAuth()
@ApiTags('card')
@UseGuards(JwtAuthGuard,CardOwnerGuard)
@Controller('card')
export class CardController {

    constructor(private readonly cardService: CardService){}
   
    @Get()
    getCards(@User() user,@Column() column){
        return this.cardService.findAll(column.id)
    }

    @Post()
    createCard(@Column() column,@Body(new ValidationPipe()) body:CreateCardDto){
        this.cardService.save(column.id,body)
    }

    @Put(':id')
    updateCard(@Column() column,@Param('id') id:string,@Body(new ValidationPipe()) body:CreateCardDto){
        this.cardService.update(column.id,id,body)
    }

    @Delete(':id')
    removeCard(@Column() column,@Param('id') id:string){
        this.cardService.remove(column.id,id)
    }
}
