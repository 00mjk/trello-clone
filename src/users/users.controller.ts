import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Post,
  Put,
  Delete,
  UsePipes,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { AccessGuard } from './access.guard';
import { UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ) {}

  @Delete(':id')
  deleteUser(@Param('id') id: string) {}
}
