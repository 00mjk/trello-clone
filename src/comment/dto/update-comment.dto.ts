import {IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    id: string
}