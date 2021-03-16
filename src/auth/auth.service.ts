import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { encryptOptions } from '../config/config';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService,) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        if (user && this.validatePassword(pass, user.pass)) {
            return user;
        }
        return null;
    }

    validatePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    async signIn(signInDto: SignInDto) {
        const isValidate = await this.validateUser(signInDto.email, signInDto.password)

        const payload = { username: isValidate.username, sub: isValidate.id };
        const token = this.jwtService.sign(payload);
        return { user_info: { ...isValidate }, access_token: token };
    }

    async signUp(signUpDto: SignUpDto) {
        const isValidate = await this.validateUser(signUpDto.email, signUpDto.password)
        if (!isValidate){
            if (signUpDto.password === signUpDto.passwordConfirmation) {
                const hashPass = await bcrypt.hash(signUpDto.password, encryptOptions.soil)
                console.log(hashPass)
                const payload = { username: signUpDto.username, sub: signUpDto.email };

                await this.usersService.save(signUpDto.email, hashPass, signUpDto.username)
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            throw new BadRequestException('passwords do not match');
        }
        throw new BadRequestException('User with email already exsist');
    }
}
