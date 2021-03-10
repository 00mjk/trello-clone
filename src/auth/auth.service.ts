import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService){}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        if(user && user.pass === pass) {
            const {pass, ...result} = user 
            return result
        } 
        return null;
    }
}
