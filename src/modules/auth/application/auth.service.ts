import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/modules/users/domain/entity/users.entity';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { RefreshTokenViewModel } from './dto/view/refreshDecode.view-model';
import { TokensViewModel } from './dto/view/tokens.view-model';
import { UserJWT } from './dto/view/user.jwt.view-model';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersRepository: UsersRepository,
	) {}

	async generateTokens(user: UsersEntity): Promise<TokensViewModel> {
		const payload: UserJWT = { id: user.id, username: user.username, email: user.email, role: user.role };
		const access_token = this.jwtService.sign(
			{ payload },
			{
				secret: this.configService.get<string>('PRIVATE_ACCESS_KEY'),
				expiresIn: '15m',
			},
		);
		const refresh_token = this.jwtService.sign(
			{ payload },
			{
				secret: this.configService.get<string>('PRIVATE_REFRESH_KEY'),
				expiresIn: '168h',
			},
		);

		return {
			access_token,
			refresh_token,
		};
	}

	async updateRefreshInDataBase(token: string, newUser: UsersEntity): Promise<void> {
		const tokenHash = await bcrypt.hash(token, 10);

		newUser.setRefreshToken(tokenHash);
		await this.usersRepository.save(newUser);
	}

	async decodeToken(token: string): Promise<RefreshTokenViewModel> {
		try {
			const decodeUser = this.jwtService.verify(token, {
				secret: this.configService.get<string>('PRIVATE_REFRESH_KEY'),
			});
			return decodeUser.payload;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
