import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';
import { CardTrello } from '../card/entity/card.entity';
import { CommentTrello } from '../comment/entity/comment.entity';


// REVU: Не надо импортировать сущности в чужой модуль.
// С каждой сущностью должен работать одноименный модуль
@Module({
  imports: [TypeOrmModule.forFeature([User,CardTrello,CommentTrello])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}