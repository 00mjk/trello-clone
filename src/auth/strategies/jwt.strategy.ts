import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CRYPTO_SOIL } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: CRYPTO_SOIL.toString(),
			ignoreExpiration: false,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	  }
}