import {IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UpdateColumnDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    id: string
}