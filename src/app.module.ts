import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { ColumnTrello } from './entity/column.entity';
import { CommentTrello } from './entity/comment.entity';
import { CardTrello } from './entity/card.entity';
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
  ]
})
export class AppModule {
}
