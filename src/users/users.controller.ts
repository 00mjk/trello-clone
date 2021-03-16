import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateColumnDto } from './dto/create-column.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getUser(@Request() req){
        return this.userService.getUserInfo(req.user.userId,req.params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/column")
    getUserAllColumns(@Request() req){
        return this.userService.getUserColumns(req.user.userId,req.params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/column/:id")
    getUserColumn(@Request() req){

    }

    @UseGuards(JwtAuthGuard)
    @Post(":id/column")
    createColumn(@Request() req,@Body() body: CreateColumnDto){
        return this.userService.createColumn(req.user.userId,req.params.id,body)
    }
}
