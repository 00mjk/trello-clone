import {IsNotEmpty} from "class-validator";
export class CreateCardDto {
    @IsNotEmpty()
    name: string
}