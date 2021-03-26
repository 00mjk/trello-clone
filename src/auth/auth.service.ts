import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { CRYPTO_SOIL } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log(`USER VALIDATe`);
    console.log(user);
    if (user && this.validatePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    if (!user) {
      throw new BadRequestException('passwords do not match');
    }
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { user_info: { ...user }, access_token: token };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.findByEmail(signUpDto.email);
    if (!user) {
      if (signUpDto.password === signUpDto.passwordConfirmation) {
        const hashPass = await bcrypt.hash(signUpDto.password, CRYPTO_SOIL);
        const payload = { username: signUpDto.username, sub: signUpDto.email };

        await this.usersService.save(
          signUpDto.email,
          hashPass,
          signUpDto.username,
        );
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      throw new BadRequestException('passwords do not match');
    }
    throw new BadRequestException('User with email already exsist');
  }
}
