import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokensViewModel } from '../dto/tokens.view-model';
import { AuthService } from '../auth.service';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';

@Injectable()
export class RefreshUseCase {
	constructor(private readonly authService: AuthService, private readonly usersRepository: UsersRepository) {}
	async execute(token: string): Promise<TokensViewModel> {
		const decodeUser = await this.authService.decodeToken(token);
		const userByEmail = await this.usersRepository.findOne({ where: { email: decodeUser.email } });

		if (!userByEmail) {
			throw new HttpException('This user was not found', HttpStatus.NOT_FOUND);
		}

		return await this.authService.generateTokens(userByEmail);
	}
}
