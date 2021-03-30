import {
  Controller,
  Delete,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userInfo } from 'os';
import { JwtAuthGuard } from '../auth/auth.guard';
import { User } from '../shared/decorators/user.decorator';
import { ColumnOwnerGuard } from './guards/column-owner.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';

@ApiBearerAuth()
@ApiTags('column')
@UseGuards(JwtAuthGuard,ColumnOwnerGuard)
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get(':id')
  getColumn(@Param('id') id: string, @User() user) {
    return this.columnService.findOne(user.id, id);
  }

  @Get()
  getColumns(@User() user) {
    return this.columnService.findAll(user.id);
  }

  @Post()
  createColumn(
    @User() user,
    @Body(new ValidationPipe()) body: CreateColumnDto,
  ) {
    return this.columnService.save(user.id, body);
  }

  @Delete(':id')
  removeColumn(@User() user, @Param('id') id: string) {
    return this.columnService.remove(user.id, id);
  }

  @Put(':id')
  updateColumn(
    @User() user,
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: CreateColumnDto,
  ) {
    return this.columnService.update(user.id, id, body);
  }
}
