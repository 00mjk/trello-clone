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
  
}
