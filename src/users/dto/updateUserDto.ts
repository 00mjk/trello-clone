import { ApiProperty } from '@nestjs/swagger';
import { isString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  pass: string;

  @ApiProperty()
  confirmPassword: string;

  @ApiProperty()
  username: string;
}
