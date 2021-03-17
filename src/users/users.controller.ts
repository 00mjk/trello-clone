import { Controller, Get, UseGuards, Request, Body, Post, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateColumnDto } from '../column/dto/create-column.dto';
import { UpdateColumnDto } from '../column/dto/update-column.dto';
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
        return this.userService.getColumns(req.user.userId,req.params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/column/:column_id")
    getUserColumn(@Request() req){
        return this.userService.getOneColumn(req.user.userId,req.params.id,req.params.column_id)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":id/column")
    createColumn(@Request() req,@Body() body: CreateColumnDto){
        return this.userService.createColumn(req.user.userId,req.params.id,body)
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/column/:column_id/edit")
    updateColumn(@Request() req,@Body() body: UpdateColumnDto){
        return this.userService.updateColumn(req.user.userId,req.params.id,body)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id/column/:column_id/remove")
    removeColumn(@Request() req){
        return this.userService.removeColumn(req.user.userId,req.params.id,req.params.column_id)
    }


}