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

    constructor(){}

}
