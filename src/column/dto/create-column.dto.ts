import {IsNotEmpty} from "class-validator";
export class CreateColumnDto {
    @IsNotEmpty()
    name: string
}