import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { AccessToken } from '../application/dto/registration.view-model';
import { RegistrationUseCase } from '../application/useCases/registration.use-case';
import { LoginInputModel } from './models/login.input-model';
import { LoginUseCase } from '../application/useCases/login.use-case';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly registrationUseCase: RegistrationUseCase, private readonly loginUseCase: LoginUseCase) {}

	@Post('registration')
	async registration(
		@Body() userData: CreateUserInputModel,
		@Res({ passthrough: true }) res: Response,
	): Promise<AccessToken> {
		const tokens = await this.registrationUseCase.execute(userData);
		res.cookie('refresh_token', tokens.refresh_token, {
			maxAge: 3600 * 1000 * 168,
			httpOnly: true,
		});
		return {
			access_token: tokens.access_token,
		};
	}

	@Post('login')
	async login(@Body() userData: LoginInputModel, @Res({ passthrough: true }) res: Response): Promise<AccessToken> {
		const tokens = await this.loginUseCase.execute(userData);
		res.cookie('refresh_token', tokens.refresh_token, {
			maxAge: 3600 * 1000 * 168,
			httpOnly: true,
		});
		return {
			access_token: tokens.access_token,
		};
	}
}
