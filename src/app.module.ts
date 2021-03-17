import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/users.entity';
import { CardTrello } from './card/entity/card.entity';
import { connectionOptions } from './config/config';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { ColumnTrello } from './column/entity/column.entity';
import { CommentTrello } from './comment/entity/comment.entity';
import { Routes ,RouterModule} from 'nest-router'
const routes: Routes = [
  {
    path: '/user',
    module: UsersModule,
    children: [
      {
        path: '/column',
        module: ColumnModule,
        children: [{
            path: '/cards',
            module: CardModule,
            children: [
              {
                path:"/comments",
                module: CommentModule,
              }
            ]
          }
        ]
      }
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
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
    CommentModule,
  ]
})
export class AppModule {
}
