import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/users.entity';
import { CardTrello } from './card/entity/card.entity';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { ColumnTrello } from './column/entity/column.entity';
import { CommentTrello } from './comment/entity/comment.entity';

import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from './constants';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
      logging: ['warn', 'error'],
      subscribers: [
        join(__dirname, "subscribers/**/*.ts")
      ],
      migrations: [
        join(__dirname, 'migrations/*{.ts,.js}')
      ],
      cli: {
        migrationsDir: 'src/migrations'
      },
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
    CommentModule,
  ]
})
export class AppModule {
}
