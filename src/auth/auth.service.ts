import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { CRYPTO_SOIL } from '../constants';
import { User } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
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
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { user_info: { ...user }, access_token: token };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.findByEmail(signUpDto.email);
    if (user) {
      throw new BadRequestException('User with email already exsist');
    }
    if (signUpDto.password !== signUpDto.passwordConfirmation) {
      throw new BadRequestException('passwords do not match');
    }
    const hashPass = await bcrypt.hash(signUpDto.password, CRYPTO_SOIL);
    const savedUser = await this.usersService.save(
      signUpDto.email,
      hashPass,
      signUpDto.username,
    );
    const payload = { email: signUpDto.email, sub: savedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
