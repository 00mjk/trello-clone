import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTrello } from './entity/comment.entity';
import { CardModule } from '../card/card.module';
import { ColumnModule } from '../column/column.module';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [
    TypeOrmModule.forFeature([CommentTrello]),
    CardModule,
    ColumnModule,
  ],
  exports: [CommentService],
})
export class CommentModule {}
