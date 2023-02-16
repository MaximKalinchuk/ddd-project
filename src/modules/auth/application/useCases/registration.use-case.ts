import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { CreateUsersUseCase } from '../../../users/application/useCases/CreateUser.use-case';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { TokensViewModel } from '../dto/tokens.view-model';
import { AuthService } from '../auth.service';
import { ConfirmationEntity } from '../../../email/domain/entity/confirmations.entity';
import { ConfirmationInputModel } from 'src/modules/email/domain/entity/models/confirmations.input-model';
import { ConfirmationRepository } from '../../../email/infrastructure/confirmations.repository';
import { v4 as uuidv4 } from 'uuid';
import { SendConfirmationLinkUseCase } from '../../../email/application/useCases/sendConfirmationLink.use-case';

@Injectable()
export class RegistrationUseCase {
	constructor(
		private readonly createUsersUseCase: CreateUsersUseCase,
		private readonly usersRepository: UsersRepository,
		private readonly authService: AuthService,
		private readonly confirmationRepository: ConfirmationRepository,
		private readonly sendConfirmationLinkUseCase: SendConfirmationLinkUseCase,
	) {}
	async execute(userData: CreateUserInputModel): Promise<TokensViewModel> {
		const userByEmail = await this.usersRepository.findOne({ where: { email: userData.email } });
		const userByUsername = await this.usersRepository.findOne({ where: { username: userData.username } });

		if (userByEmail || userByUsername) {
			throw new HttpException('This user is already registered', HttpStatus.BAD_REQUEST);
		}

		const newUser = await this.createUsersUseCase.execute(userData);

		const confirmationParams: ConfirmationInputModel = {
			userId: +newUser.id,
			confirmationCode: uuidv4(),
			isConfirmed: false,
		};
		const confirmation = new ConfirmationEntity(confirmationParams);
		await this.confirmationRepository.save(confirmation);
		await this.sendConfirmationLinkUseCase.execute(newUser.email, confirmationParams.confirmationCode);

		const tokens = await this.authService.generateTokens(newUser);
		await this.authService.updateRefreshInDataBase(tokens.refresh_token, newUser);

		return tokens;
	}
}
