import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CRYPTO_SOIL, JWT_SECRET } from '../../constants';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService,userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_SECRET,
			ignoreExpiration: false,
		});
	}

	async validate(payload: any) {
		const user = { userId: payload.sub, username: payload.username }
		const userValidate = this.userService.findById(user.userId)
		if(!userValidate){
			throw new UnauthorizedException();
		}
		return user;
	  }
}