import {IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    description: string
}