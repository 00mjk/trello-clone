import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
	@IsString()
	@IsNotEmpty()
    @MinLength(8)
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    passwordConfirmation: string

    @ApiProperty()
    @IsNotEmpty()
    username: string


}