
export class GetProfileDto {
    username?: string
    email: string
    id: string
    constructor(username?:string, email?:string, id?:string){
        this.email = email
        this.id = id
        this.username = username
    }
}