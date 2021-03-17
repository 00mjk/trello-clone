import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnService } from './column.service';
import { ColumnTrello } from './entity/column.entity';
import { ColumnController } from './column.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnTrello])],
  providers: [ColumnService],
  exports: [ColumnService],
  controllers: [ColumnController]
})
export class ColumnModule {}
