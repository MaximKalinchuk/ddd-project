import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { CreateUsersCommand, CreateUsersUseCase } from '../../../users/application/useCases/create.user.use-case';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { TokensViewModel } from '../dto/tokens.view-model';
import { AuthService } from '../auth.service';
import { SendEmailConfirmationLinkUseCase } from 'src/modules/email/application/useCases/emailConformation/sendEmailConfirmationLink.use-case';
import { UsersQueryRepository } from '../../../../modules/users/infrastructure/users.query.repository';
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';

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
			throw new BadRequestException('Пользователь с такой почтой уже существует');
		}

		if (userByUsername) {
			throw new BadRequestException('Пользователь с таким ником уже существует');
		}
		console.log(command);
		const newUser = await this.commandBus.execute(new CreateUsersCommand(command));

		// await this.sendEmailConfirmationLinkUseCase.execute(newUser.email, newUser.emailConfirmation.confirmationCode);
		const tokens = await this.authService.generateTokens(newUser);

		await this.authService.updateRefreshInDataBase(tokens.refresh_token, newUser);

		return tokens;
	}
}
