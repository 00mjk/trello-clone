import { Controller, Delete, Get, UseGuards ,Request, Post, Body, Put} from '@nestjs/common';
import {ApiBody,ApiBearerAuth,ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/auth.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('/')
export class ColumnController {
    constructor(private readonly columnService: ColumnService){}
    @UseGuards(JwtAuthGuard)
    @Get("/")
    getUserAllColumns(@Request() req){
        return this.columnService.getColumns(req.user.userId,req.params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:column_id")
    getUserColumn(@Request() req){
        return this.columnService.getOneColumn(req.user.userId,req.params.id,req.params.column_id)
    }


    @ApiBody({ type: [CreateColumnDto] })
    @UseGuards(JwtAuthGuard)
    @Post("/")
    createColumn(@Request() req,@Body(new ValidationPipe()) body: CreateColumnDto){
        return this.columnService.createColumn(req.user.userId,req.params.id)
    }


    @ApiBody({ type: [UpdateColumnDto] })
    @UseGuards(JwtAuthGuard)
    @Put("/:column_id/edit")
    updateColumn(@Request() req,@Body(new ValidationPipe()) body: UpdateColumnDto){
        return this.columnService.updateColumn(req.user.userId,req.params.id,body)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:column_id/remove")
    removeColumn(@Request() req){
        return this.columnService.removeColumn(req.user.userId,req.params.id,req.params.column_id)
    }
}