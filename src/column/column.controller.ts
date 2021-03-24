import { Controller, Delete, Get, UseGuards ,Request, Post, Body, Put, Param} from '@nestjs/common';
import {ApiBody,ApiBearerAuth,ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/auth.guard';
import { User } from '../shared/decorators/user.decorator';
import { ColumnOwnerGuard } from '../shared/guards/column-owner.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@UseGuards(JwtAuthGuard,ColumnOwnerGuard)
@Controller('column')
export class ColumnController {
    constructor(private readonly columnService: ColumnService){}
  
    @Get(':id')
    getColumn(@Param('id') id:string,@User() user){
        console.log(user)
    }

    @Get()
    getColumns(@User() user){
        console.log(user)
        return this.columnService.findAll(user.userId)
    }

    @Post()
    createColumn(@User() user,@Body(new ValidationPipe()) body: CreateColumnDto){
        return this.columnService.save(user.userId,body)
    }
}
