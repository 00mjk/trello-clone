import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as connectionOptions from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
