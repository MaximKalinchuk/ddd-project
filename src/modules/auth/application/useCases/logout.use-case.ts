import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { AuthService } from '../auth.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from 'src/modules/users/infrastructure/users.query.repository';
import { EXCEPTION_USER_MESSAGES } from 'src/constants/exception.messages.enum';

export class LogoutCommand {
	public refresh_token: string;
	constructor(refresh_token: string) {
		this.refresh_token = refresh_token;
	}
}

@CommandHandler(LogoutCommand)
export class LogoutUseCase implements ICommandHandler<LogoutCommand> {
	constructor(
		private readonly authService: AuthService,
		private readonly usersQueryRepository: UsersQueryRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute(command: LogoutCommand): Promise<void> {
		const { refresh_token } = command;
		const user = await this.authService.decodeToken(refresh_token);

		const userById = await this.usersQueryRepository.getUserById(user.id);
		if (!userById) {
			throw new UnauthorizedException(EXCEPTION_USER_MESSAGES.USER_NOT_FOUND_404);
		}

		userById.refresh_token = null;
		await this.usersRepository.save(userById);
	}
}
