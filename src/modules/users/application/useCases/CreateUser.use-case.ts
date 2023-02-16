import { CreateUserInputModel } from '../../api/models/createUser.input-modal';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UsersEntity } from '../../domain/entity/users.entity';
import { UserInputModel } from '../../domain/entity/models/user.input-model';
import { UserRole } from 'src/constants/UserRole';
import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

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
		const newUser = new UsersEntity(userParams);
		return await this.usersRepository.save(newUser);
	}
}
