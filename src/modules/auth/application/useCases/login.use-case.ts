import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { LoginInputModel } from '../../api/models/login.input-model';
import { AuthService } from '../auth.service';
import { TokensViewModel } from '../dto/tokens.view-model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
	constructor(private readonly usersRepository: UsersRepository, private readonly authService: AuthService) {}

	async execute(userData: LoginInputModel): Promise<TokensViewModel> {
		console.log(userData);
		const userByEmail = await this.usersRepository.findOne({ where: { email: userData.email } });
		if (!userByEmail) {
			throw new HttpException('This user is not exist', HttpStatus.UNAUTHORIZED);
		}

		return await this.authService.generateTokens(userByEmail);
	}
}

/// alexshowmanbis@gmail.com
/// 123456789-km
