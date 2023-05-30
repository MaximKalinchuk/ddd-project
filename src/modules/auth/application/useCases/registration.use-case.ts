import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { CreateUsersCommand, CreateUsersUseCase } from '../../../users/application/useCases/create.user.use-case';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SendEmailConfirmationLinkUseCase } from 'src/modules/email/application/useCases/emailConformation/sendEmailConfirmationLink.use-case';
import { UsersQueryRepository } from '../../../../modules/users/infrastructure/users.query.repository';
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { EmailConfirmationEntity } from 'src/modules/email/domain/entity/emailConfirmation.entity';
import { TokensViewModel } from '../dto/view/tokens.view-model';
import { EXCEPTION_USER_MESSAGES } from '@lib/constants/exception.messages.enum';

export class RegistrationCommand {
	public username: string;
	public email: string;
	public password: string;

	constructor(userData: CreateUserInputModel) {
		this.email = userData.email;
		this.password = userData.password;
		this.username = userData.username;
	}
}

@CommandHandler(RegistrationCommand)
export class RegistrationUseCase implements ICommandHandler<RegistrationCommand> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly usersQueryRepository: UsersQueryRepository,
		private readonly authService: AuthService,
		private readonly sendEmailConfirmationLinkUseCase: SendEmailConfirmationLinkUseCase,
	) {}
	async execute(command: RegistrationCommand): Promise<TokensViewModel> {
		const { username, email, password } = command;
		const userByEmail = await this.usersQueryRepository.getUserByEmail(email);
		const userByUsername = await this.usersQueryRepository.getUserByUsername(username);

		if (userByEmail) {
			throw new BadRequestException(EXCEPTION_USER_MESSAGES.USER_EMAIL_400);
		}

		if (userByUsername) {
			throw new BadRequestException(EXCEPTION_USER_MESSAGES.USER_USERNAME_400);
		}
		const newUser = await this.commandBus.execute(new CreateUsersCommand(command));

		// await this.sendEmailConfirmationLinkUseCase.execute(newUser.email, newUser.emailConfirmation.confirmationCode);
		const tokens = await this.authService.generateTokens(newUser);

		await this.authService.updateRefreshInDataBase(tokens.refresh_token, newUser);

		return tokens;
	}
}
