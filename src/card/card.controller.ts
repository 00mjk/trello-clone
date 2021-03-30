import {
  Controller,
  Delete,
  Get,
  UseGuards,
  Post,
  Body,
  Put,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ColumnExsistGuard } from '../column/guards/column-exsist.guard';
import { User } from '../shared/decorators/user.decorator';
import { CardExsistGuard } from './card-exsist.guard';
import { CardService } from './card.service';
import { CreateCardDto, FindColumnDto } from './dto/card.dto';

@ApiBearerAuth()
@ApiTags('card')
@UseGuards(JwtAuthGuard, ColumnExsistGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getCards(@Body(new ValidationPipe()) body: FindColumnDto) {
    return this.cardService.findByColumnId(body.columnId);
  }

  @Post()
  createCard(@Body(new ValidationPipe()) body: CreateCardDto) {
    return this.cardService.save(body);
  }

  @Put(':id')
  updateCard(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: CreateCardDto,
  ) {
    this.cardService.update(id, body);
  }

  @Delete(':id')
  removeCard(
    @Body(new ValidationPipe()) body: FindColumnDto,
    @Param('id') id: string,
  ) {
    return this.cardService.remove(body.columnId, id);
  }
}
