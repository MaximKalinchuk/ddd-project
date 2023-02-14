import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { AccessToken } from '../application/dto/registration.view-model';
import { RegistrationUseCase } from '../application/useCases/registration.use-case';

@Controller('auth')
export class AuthController {
	constructor(private readonly registrationUseCase: RegistrationUseCase) {}

	@Post('registration')
	async registration(@Body() userData: CreateUserInputModel): Promise<AccessToken> {
		const tokens = await this.registrationUseCase.execute(userData);
		return {
			access_token: tokens.access_token,
		};
	}
}
