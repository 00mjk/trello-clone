import {IsNotEmpty} from "class-validator";
export class UpdateColumnDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    id: string
}