import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: [SignInDto] })
  @ApiOperation({ summary: 'Sign in with user credentials' })
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  signIn(@Body(new ValidationPipe()) body: SignInDto) {
    return this.authService.signIn(body);
  }

  @ApiOperation({ summary: 'Sign up with user credentials' })
  @ApiBody({ type: [SignUpDto] })
  @Post('sign-up')
  signUp(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
