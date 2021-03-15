import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string


	@IsString()
	@IsNotEmpty()
    @MinLength(8)
    password: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    passwordConfirmation: string

    @IsNotEmpty()
    username: string


}