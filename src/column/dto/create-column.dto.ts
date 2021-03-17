import {IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateColumnDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string
}