import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'access') {
	constructor(private readonly configService: ConfigService) {
		super({
			ignoreExpiration: false,
			secretOrKey: configService.get('PRIVATE_ACCESS_KEY'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}
	async validate(payload: any) {
		return payload.payload;
	}
}
