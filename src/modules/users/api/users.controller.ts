import { Body, Controller, Post } from '@nestjs/common';
import { UserInputModel } from '../domain/entity/models/user.input-model';
import { UsersEntity } from '../domain/entity/users.entity';
import { UsersRepository } from '../infrastructure/users.repository';
import { CreateUsersUseCase } from '../application/useCases/CreateUser.use-case';
import { CreateUserInputModel } from './models/createUser.input-modal';

@Controller('users')
export class UsersController {
	constructor(private readonly createUsersUseCase: CreateUsersUseCase) {}

	@Post()
	async createUser(@Body() userData: CreateUserInputModel): Promise<UsersEntity> {
		return await this.createUsersUseCase.execute(userData);
	}
}
