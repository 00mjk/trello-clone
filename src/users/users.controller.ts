import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getUser(@Request() req){
        return "user";
    }
}
