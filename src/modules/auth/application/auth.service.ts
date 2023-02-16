import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/modules/users/domain/entity/users.entity';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { TokensViewModel } from './dto/tokens.view-model';
@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersRepository: UsersRepository,
	) {}

	async generateTokens(user: UsersEntity): Promise<TokensViewModel> {
		const payload = { id: user.id, username: user.username, email: user.email, role: user.role };
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
		newUser.refreshToken = token;
		await this.usersRepository.save(newUser);
	}
}
