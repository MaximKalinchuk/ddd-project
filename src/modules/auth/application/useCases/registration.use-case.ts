import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { CreateUsersUseCase } from '../../../users/application/useCases/CreateUser.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegistrationUseCase {
	constructor(private readonly createUsersUseCase: CreateUsersUseCase) {}
	async execute(userData: CreateUserInputModel) {
		return await this.createUsersUseCase.execute(userData);
	}
}
