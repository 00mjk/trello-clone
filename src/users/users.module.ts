import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnTrello } from '../column/entity/column.entity';
import { UsersController } from './users.controller';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';
import { CardTrello } from '../card/entity/card.entity';
import { CommentTrello } from '../comment/entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,ColumnTrello,CardTrello,CommentTrello])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}