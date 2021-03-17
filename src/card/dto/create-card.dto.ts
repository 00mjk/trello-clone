import {IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string
}