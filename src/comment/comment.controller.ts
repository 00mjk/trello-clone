import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto, FindCardDto } from './dto/comment.dto';
import { CommentOwnerGuard } from './comment-owner.guard';

@ApiBearerAuth()
@ApiTags('comment')
@UseGuards(JwtAuthGuard, CommentOwnerGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getComments(@Body(new ValidationPipe()) body: FindCardDto) {
    return this.commentService.findAll(body.cardId);
  }

  @Post()
  createComment(
    @Body(new ValidationPipe()) body: CreateCommentDto,
  ) {
    this.commentService.save(body);
  }

  @Put(':id')
  updateComment(
    @Body(new ValidationPipe()) body: CreateCommentDto,
    @Param('id') id: string,
  ) {
    this.commentService.update(id,body);
  }

  @Delete(':id')
  removeComment(@Body(new ValidationPipe()) body: FindCardDto, @Param('id') id) {
    this.commentService.remove(body.cardId, id);
  }
}
