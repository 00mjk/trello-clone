import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/comment.dto';
import { CommentTrello } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentTrello)
    private comentRepository: Repository<CommentTrello>,
  ) {}

  async save(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentTrello> {
    return await this.comentRepository.save({
      card: { id: createCommentDto.cardId },
      name: createCommentDto.name,
      description: createCommentDto.description,
    });
  }

  async findAll(cardId: string): Promise<CommentTrello[]> {
    return await this.comentRepository.find({
      where: {
        card: {
          id: cardId,
        },
      },
    });
  }

  async findOne(
    cardId: string,
    commentId: string,
  ): Promise<CommentTrello | null> {
    return await this.comentRepository.findOne({
      where: {
        card: { id: cardId },
        id: commentId,
      },
    });
  }

  async update(
    commentId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentTrello> {
    let comment = await this.findOne(createCommentDto.cardId, commentId);
    comment.name = createCommentDto.name;
    comment.description = createCommentDto.description;

    return await this.comentRepository.save(comment);
  }

  async remove(cardId: string, commentId: string): Promise<CommentTrello> {
    const card = await this.findOne(cardId, commentId);
    await this.comentRepository.delete({
      card: { id: cardId },
      id: commentId,
    });
    return card;
  }
}
