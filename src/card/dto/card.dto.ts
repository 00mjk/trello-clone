import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  columnId: string;
}

export class FindColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  columndId: string
}