import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  isString,
  MinLength,
} from 'class-validator';
import { ColumnTrello } from '../../column/entity/column.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @MinLength(5)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;
}

export class GetProfileDto {
  username?: string;
  email: string;
  id: string;
  columns?: ColumnTrello[];
  constructor(
    username?: string,
    email?: string,
    id?: string,
    columns?: ColumnTrello[],
  ) {
    this.email = email;
    this.id = id;
    this.username = username;
    this.columns = columns;
  }
}
