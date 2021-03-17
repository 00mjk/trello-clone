import { ColumnTrello } from "../../column/entity/column.entity"


export class GetProfileDto {
    username?: string
    email: string
    id: string
    columns?: ColumnTrello[]
    constructor(username?:string, email?:string, id?:string,columns?: ColumnTrello[]){
        this.email = email
        this.id = id
        this.username = username
        this.columns = columns
    }
}