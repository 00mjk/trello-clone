import { Controller, Delete, Get, UseGuards ,Request, Post, Body, Put, Param} from '@nestjs/common';
import {ApiBody,ApiBearerAuth,ApiTags} from '@nestjs/swagger'
import { userInfo } from 'os';
import { JwtAuthGuard } from '../shared/guards/auth.guard';
import { User } from '../shared/decorators/user.decorator';
import { ColumnOwnerGuard } from '../shared/guards/column-owner.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';

@UseGuards(JwtAuthGuard)
@Controller('column')
export class ColumnController {
    constructor(private readonly columnService: ColumnService){}
  
    @Get(':id')
    getColumn(@Param('id') id:string,@User() user){
        return this.columnService.findOne(user.userId,id)
    }

    @Get()
    getColumns(@User() user){
        return this.columnService.findAll(user.userId)
    }

    @Post()
    createColumn(@User() user,@Body(new ValidationPipe()) body: CreateColumnDto){
        return this.columnService.save(user.userId,body)
    }

    @Delete(':id')
    removeColumn(@User() user,@Param('id') id:string){
        return this.columnService.remove(user.userId,id)
    }

    @Put(':id')
    updateColumn(@User() user,@Param('id') id:string,@Body(new ValidationPipe()) body: CreateColumnDto){
        return this.columnService.update(user.userId,id,body)
    }
}
