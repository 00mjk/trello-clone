import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { User } from './users/users.entity';
import { ColumnTrello } from './column/column.entity';
import { CommentTrello } from './comment/comment.entity';
import { CardTrello } from './card/card.entity';
import { connectionOptions } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connectionOptions, autoLoadEntities: true,
      entities: [
        User,
        ColumnTrello,
        CommentTrello,
        CardTrello]
    }),
    AuthModule,
    UsersModule,
    ColumnModule,
    CardModule,
    CommentModule
  ]
})
export class AppModule {
}
