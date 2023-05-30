import { UsersQueryRepository } from 'src/modules/users/infrastructure/users.query.repository';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { LoginInputModel } from '../../api/models/login.input-model';
import { AuthService } from '../auth.service';
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokensViewModel } from '../dto/view/tokens.view-model';
import { EXCEPTION_USER_MESSAGES } from '@lib/constants/exception.messages.enum';
const bcrypt = require('bcrypt');

export class LoginCommand {
	public email: string;
	public password: string;
	constructor(userData: LoginInputModel) {
		this.email = userData.email;
		this.password = userData.password;
	}
}
@CommandHandler(LoginCommand)
export class LoginUseCase implements ICommandHandler<LoginCommand> {
	constructor(private readonly usersQueryRepository: UsersQueryRepository, private readonly authService: AuthService) {}

	async execute(command: LoginCommand): Promise<TokensViewModel> {
		const { email, password } = command;
		const userByEmail = await this.usersQueryRepository.getUserByEmailWithEmailConfirmation(email);
		if (!userByEmail) {
			throw new NotFoundException(EXCEPTION_USER_MESSAGES.USER_NOT_FOUND_404);
		}

		const isPasswordValid = await bcrypt.compare(password, userByEmail.passwordHash);

		if (!isPasswordValid) {
			throw new UnauthorizedException(EXCEPTION_USER_MESSAGES.USER_UNAUTHORIZED_401);
		}

		if (!userByEmail.emailConfirmation.isConfirmed) {
			throw new UnauthorizedException(EXCEPTION_USER_MESSAGES.USER_CONFORMATION_UNAUTHORIZED_401);
		}
		const tokens = await this.authService.generateTokens(userByEmail);
		await this.authService.updateRefreshInDataBase(tokens.refresh_token, userByEmail);
		return tokens;
	}
}
