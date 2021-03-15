import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    email: string


	@IsNotEmpty()
    @MinLength(6)
    password: string
}