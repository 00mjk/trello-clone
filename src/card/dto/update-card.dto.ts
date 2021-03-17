import {IsNotEmpty} from "class-validator";
export class UpdateCardDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    id: string
}