import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    try {
      const signInDto = new SignInDto();
      signInDto.email = email;
      signInDto.password = password;
      const user = await this.userService.findOne(email);

      if (
        user &&
        !this.authService.validatePassword(signInDto.password, user.pass)
      ) {
        throw new Error('Invalid password');
      }

      return user;
    } catch (error) {
      throw new BadRequestException('Invalid email or password');
    }
  }
}
