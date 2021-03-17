import {IsNotEmpty} from "class-validator";
export class UpdateCommentDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    id: string
}