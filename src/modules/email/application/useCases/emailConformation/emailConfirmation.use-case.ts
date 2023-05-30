import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../../../../users/infrastructure/users.repository';
import { UsersQueryRepository } from '../../../../users/infrastructure/users.query.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EXCEPTION_EMAIL_MESSAGES } from '@lib/constants/exception.messages.enum';

export class EmailConfirmationCommand {
	public confirmationCode: string;
	constructor(confirmationCode: string) {
		this.confirmationCode = confirmationCode;
	}
}

@CommandHandler(EmailConfirmationCommand)
export class EmailConfirmationUseCase implements ICommandHandler<EmailConfirmationCommand> {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly usersQueryRepository: UsersQueryRepository,
	) {}

	async execute(command: EmailConfirmationCommand): Promise<void> {
		const { confirmationCode } = command;
		const allUsers = await this.usersQueryRepository.getAllUsersWithAllRelations();
		const user = allUsers.filter((user) => user.emailConfirmation.confirmationCode === confirmationCode)[0];
		if (!user) {
			throw new BadRequestException(EXCEPTION_EMAIL_MESSAGES.EMAIL_LINK_TIME_400);
		}

		user.emailConfirmation.confirmationCode = '';
		user.emailConfirmation.isConfirmed = true;
		await this.usersRepository.save(user);
	}
}
