import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { LoginInputModel } from '../../api/models/login.input-model';
import { AuthService } from '../auth.service';
import { TokensViewModel } from '../dto/tokens.view-model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfirmationRepository } from 'src/modules/email/infrastructure/confirmations.repository';
const bcrypt = require('bcrypt');

@Injectable()
export class LoginUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly authService: AuthService,
		private readonly confirmationRepository: ConfirmationRepository,
	) {}

	async execute(userData: LoginInputModel): Promise<TokensViewModel> {
		const userByEmail = await this.usersRepository.findOne({ where: { email: userData.email } });
		if (!userByEmail) {
			throw new HttpException('This user was not found', HttpStatus.NOT_FOUND);
		}

		const isPasswordValid = await bcrypt.compare(userData.password, userByEmail.passwordHash);

		if (!isPasswordValid) {
			throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
		}

		const confirmation = await this.confirmationRepository.findOne({ where: { userId: userByEmail.id } });

		if (!confirmation.isConfirmed) {
			throw new HttpException(
				'Please confirm your account. The message was sent to the mail during registration.',
				HttpStatus.BAD_REQUEST,
			);
		}

		return await this.authService.generateTokens(userByEmail);
	}
}
