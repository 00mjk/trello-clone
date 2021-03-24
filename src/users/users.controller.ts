import { Controller, Get, UseGuards, Request, Body, Post, Put, Delete, UsePipes } from '@nestjs/common';
import {ApiBody,ApiBearerAuth,ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateCardDto } from '../card/dto/create-card.dto';
import { UpdateCardDto } from '../card/dto/update-card.dto';
import { CreateColumnDto } from '../column/dto/create-column.dto';
import { UpdateColumnDto } from '../column/dto/update-column.dto';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { UsersService } from './users.service';


  
@ApiBearerAuth()
@ApiTags('user')
@Controller('/')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    

    

}