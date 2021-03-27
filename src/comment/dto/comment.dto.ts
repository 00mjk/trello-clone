import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  cardId: string;

  @ApiProperty()
  @IsNotEmpty()
  columnId: string;
}

export class FindCardDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cardId: string;
}