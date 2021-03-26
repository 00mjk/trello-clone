import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Card } from '../shared/decorators/card.decorator';
import { Column } from '../shared/decorators/column.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CommentOwnerGuard } from '../shared/guards/comment-owner.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';


@ApiBearerAuth()
@ApiTags('comment')
@UseGuards(JwtAuthGuard,CommentOwnerGuard)
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService:CommentService){}

    @Get()
    getComments(@Card() card){
        return this.commentService.findAll(card.id)
    }

    @Post()
    createComment(@Card() card,@Body(new ValidationPipe()) body:CreateCommentDto){
       // console.log(card)
        this.commentService.save(card.id,body)
    }

    @Put(':id')
    updateComment(@Card() card,@Body(new ValidationPipe()) body:CreateCommentDto,@Param('id') id: string){
        this.commentService.update(card.id,id,body)
    }

    @Delete(':id')
    removeComment(@Card() card,@Param('id') id){
        this.commentService.remove(card.id,id)
    }
}
