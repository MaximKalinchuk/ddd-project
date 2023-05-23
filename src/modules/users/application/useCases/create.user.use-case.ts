import { CreateUserInputModel } from '../../api/models/createUser.input-modal';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UsersEntity } from '../../domain/entity/users.entity';
import { UserInputModel } from '../../domain/entity/models/user.input-model';
import { USER_ROLES } from 'src/constants/user.role.enum';
import { EmailConfirmationInputModel } from 'src/modules/email/domain/entity/models/confirmations.input-model';
const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from 'uuid';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailConfirmationEntity } from '../../../email/domain/entity/emailConfirmation.entity';

export class CreateUsersCommand {
	public username: string;
	public email: string;
	public password: string;

	constructor(userData: CreateUserInputModel) {
		this.email = userData.email;
		this.password = userData.password;
		this.username = userData.username;
	}
}

@CommandHandler(CreateUsersCommand)
export class CreateUsersUseCase implements ICommandHandler<CreateUsersCommand> {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute(command: CreateUsersCommand): Promise<UsersEntity> {
		const userParams: UserInputModel = {
			email: command.email,
			username: command.username,
			role: USER_ROLES.USER,
			password: command.password,
		};

		const newUser = await UsersEntity.create(userParams);

		const confirmation = EmailConfirmationEntity.create(newUser.id);
		confirmation.created_At;
		newUser.emailConfirmation = confirmation;

		const user = await this.usersRepository.save(newUser);

		return user;
	}
}
