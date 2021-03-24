import { Controller, Get, UseGuards, Request, Body, Post, Put, Delete, UsePipes, Param } from '@nestjs/common';
import {ApiBody,ApiBearerAuth,ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateCardDto } from '../card/dto/create-card.dto';
import { UpdateCardDto } from '../card/dto/update-card.dto';
import { CreateColumnDto } from '../column/dto/create-column.dto';
import { UpdateColumnDto } from '../column/dto/update-column.dto';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';
import { AccessGuard } from '../shared/guards/access.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { UpdateUserDto } from './dto/updateUserDto';
import { UsersService } from './users.service';


  
@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtAuthGuard,AccessGuard)
@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @Get(":id")
    getUser(@Param('id') id: string){
        return this.userService.findById(id)
    }
    
    @Put(":id")
    updateUser(@Param('id') id: string,@Body(new ValidationPipe()) body: UpdateUserDto){

    }


}