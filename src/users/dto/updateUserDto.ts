import { ApiProperty } from "@nestjs/swagger";
import { isString } from "class-validator";

// REVU: используй validationPipe из nestjs
export class UpdateUserDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    pass: string

    @ApiProperty()
    confirmPassword: string

    @ApiProperty()
    username: string
}