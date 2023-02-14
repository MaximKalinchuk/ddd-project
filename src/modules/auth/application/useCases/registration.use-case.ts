import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { CreateUsersUseCase } from '../../../users/application/useCases/CreateUser.use-case';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { TokensViewModel } from '../dto/tokens.view-model';
import { UsersService } from 'src/modules/users/application/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RegistrationUseCase {
	constructor(
		private readonly createUsersUseCase: CreateUsersUseCase,
		private readonly usersRepository: UsersRepository,
		private readonly authService: AuthService,
	) {}
	async execute(userData: CreateUserInputModel): Promise<TokensViewModel> {
		const userByEmail = await this.usersRepository.findOne({ where: { email: userData.email } });
		const userByUsername = await this.usersRepository.findOne({ where: { username: userData.username } });

		if (userByEmail || userByUsername) {
			throw new HttpException('This user is already registered', HttpStatus.BAD_REQUEST);
		}

		const newUser = await this.createUsersUseCase.execute(userData);
		const tokens = await this.authService.generateTokens(newUser);
		return tokens;
	}
}
