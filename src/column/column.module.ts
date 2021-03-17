import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';

@Module({
  providers: [ColumnService],
  imports: [ColumnService],
  exports: [ColumnService]
})
export class ColumnModule {}
