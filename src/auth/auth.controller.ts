import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('sign-in')
    signIn(@Body() body: SignInDto){
        return this.authService.signIn(body);
    }

	@Post('sign-up')
    signUp(@Body() body: SignUpDto) {
		return this.authService.signUp(body);
	}
}
