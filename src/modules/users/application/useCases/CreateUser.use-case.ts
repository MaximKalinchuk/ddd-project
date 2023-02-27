import { CreateUserInputModel } from '../../api/models/createUser.input-modal';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UsersEntity } from '../../domain/entity/users.entity';
import { UserInputModel } from '../../domain/entity/models/user.input-model';
import { UserRole } from 'src/constants/UserRole';
import { Injectable } from '@nestjs/common';
import { EmailConfirmationInputModel } from 'src/modules/email/domain/entity/models/confirmations.input-model';
const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateUsersUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute(userData: CreateUserInputModel): Promise<UsersEntity> {
		const passwordHash = await bcrypt.hash(userData.password, 10);
		const userParams: UserInputModel = {
			email: userData.email,
			username: userData.username,
			role: UserRole.USER,
			refresh_token: null,
			passwordHash,
		};
		const confirmationParams: EmailConfirmationInputModel = {
			confirmationCode: uuidv4(),
		};

		// const confirmation = new EmailConfirmationEntity(confirmationParams);
		// await this.confirmationRepository.save(confirmation);

		const newUser = new UsersEntity(userParams, confirmationParams);
		console.log(newUser);
		return await this.usersRepository.save(newUser);
	}
}
