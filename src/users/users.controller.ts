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
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getUser(@Request() req){
        return this.userService.getUserInfo(req.user.userId,req.params.id)
    }

 
    @UseGuards(JwtAuthGuard)
    @Get(":id/column")
    getUserAllColumns(@Request() req){
        return this.userService.getColumns(req.user.userId,req.params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/column/:column_id")
    getUserColumn(@Request() req){
        return this.userService.getOneColumn(req.user.userId,req.params.id,req.params.column_id)
    }


    @ApiBody({ type: [CreateColumnDto] })
    @UseGuards(JwtAuthGuard)
    @Post(":id/column")
    createColumn(@Request() req,@Body(new ValidationPipe()) body: CreateColumnDto){
        return this.userService.createColumn(req.user.userId,req.params.id,body)
    }


    @ApiBody({ type: [UpdateColumnDto] })
    @UseGuards(JwtAuthGuard)
    @Put(":id/column/:column_id/edit")
    updateColumn(@Request() req,@Body(new ValidationPipe()) body: UpdateColumnDto){
        return this.userService.updateColumn(req.user.userId,req.params.id,body)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id/column/:column_id/remove")
    removeColumn(@Request() req){
        return this.userService.removeColumn(req.user.userId,req.params.id,req.params.column_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/column/:column_id/cards")
    getAllCards(@Request() req){
        return this.userService.getCards(req.user.userId,req.params.id,req.params.column_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/column/:column_id/cards/:card_id")
    getCard(@Request() req){
        return this.userService.getOneCard(req.user.userId,req.params.id,req.params.column_id,req.params.card_id)
    }


    @ApiBody({ type: [CreateCardDto] })
    @UseGuards(JwtAuthGuard)
    @Post(":id/column/:column_id/cards")
    createCard(@Request() req,@Body(new ValidationPipe()) body: CreateCardDto){
        return this.userService.createCards(req.user.userId,req.params.id,req.params.column_id,body)
    }


    @ApiBody({ type: [UpdateCardDto] })
    @UseGuards(JwtAuthGuard)
    @Put(":id/column/:column_id/cards/:card_id/edit")
    updateCard(@Request() req,@Body(new ValidationPipe()) body: UpdateCardDto){
        return this.userService.updateCards(req.user.userId,req.params.id,req.params.column_id,body)
    }


    @UseGuards(JwtAuthGuard)
    @Delete(":id/column/:column_id/cards/:card_id/remove")
    deleteCard(@Request() req){
        return this.userService.deleteCard(req.user.userId,req.params.id,req.params.column_id,req.params.card_id)
    }

    //Comments
    @UseGuards(JwtAuthGuard)
    @Get(":id/column/:column_id/cards/:card_id/comments")
    getComments(@Request() req){
        return this.userService.getAllComments(req.user.userId,req.params.id,req.params.column_id,req.params.card_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/column/:column_id/cards/:card_id/comments/:comment_id")
    getComment(@Request() req){
        return this.userService.getComment(req.user.userId,req.params.id,req.params.column_id,req.params.card_id,req.params.comment_id);
    }


    @ApiBody({ type: [CreateCommentDto] })
    @UseGuards(JwtAuthGuard)
    @Post(":id/column/:column_id/cards/:card_id/comments")
    createComment(@Request() req,@Body(new ValidationPipe()) body: CreateCommentDto){
        return this.userService.createComment(req.user.userId,req.params.id,req.params.column_id,req.params.card_id,body)
    }


    @ApiBody({ type: [UpdateCommentDto] })
    @UseGuards(JwtAuthGuard)
    @Put(":id/column/:column_id/cards/:card_id/comments/:comment_id/edit")
    updateComment(@Request() req,@Body(new ValidationPipe()) body: UpdateCommentDto){
        return this.userService.updateComment(req.user.userId,req.params.id,req.params.column_id,req.params.card_id,body)
    }
    
    
    @UseGuards(JwtAuthGuard)
    @Delete(":id/column/:column_id/cards/:card_id/comments/:comment_id/remove")
    removeComment(@Request() req){
        return this.userService.deleteComment(req.user.userId,req.params.id,req.params.column_id,req.params.card_id,req.params.comment_id)
    }
}