import { CreateUserInputModel } from '../../api/models/createUser.input-modal';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UsersEntity } from '../../domain/entity/users.entity';
import { UserInputModel } from '../../domain/entity/models/user.input-model';
import { UserRole } from 'src/constants/UserRole';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUsersUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute(userData: CreateUserInputModel): Promise<UsersEntity> {
		console.log(userData);
		const userParams: UserInputModel = {
			email: userData.email,
			username: userData.username,
			role: UserRole.USER,
			refresh_token: 'dasdasd',
			passwordHash: userData.password,
		};
		const newUser = new UsersEntity(userParams);
		return await this.usersRepository.save(newUser);
	}
}
