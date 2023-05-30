import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../../users/infrastructure/users.repository';
import { UsersQueryRepository } from '../../../../users/infrastructure/users.query.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EXCEPTION_EMAIL_MESSAGES } from '@lib/constants/exception.messages.enum';

export class PasswordConformationCommand {
	public confirmationCode: string;
	constructor(confirmationCode: string) {
		this.confirmationCode = confirmationCode;
	}
}

@CommandHandler(PasswordConformationCommand)
export class PasswordConformationUseCase implements ICommandHandler<PasswordConformationCommand> {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly usersQueryRepository: UsersQueryRepository,
	) {}

	async execute(command: PasswordConformationCommand): Promise<void> {
		const { confirmationCode } = command;
		const allUsers = await this.usersQueryRepository.getAllUsersWithAllRelations();

		const user = allUsers.filter((user) => user.passwordRecovery.confirmationCode === confirmationCode)[0];
		if (!user) {
			throw new BadRequestException(EXCEPTION_EMAIL_MESSAGES.EMAIL_LINK_TIME_400);
		}

		user.passwordHash = user.passwordRecovery.newPassword;
		user.passwordRecovery.newPassword = null;
		user.passwordRecovery.confirmationCode = null;
		await this.usersRepository.save(user);
	}
}
