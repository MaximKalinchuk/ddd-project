import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { AccessToken } from '../application/dto/registration.view-model';
import { RegistrationUseCase } from '../application/useCases/registration.use-case';
import { LoginInputModel } from './models/login.input-model';
import { LoginUseCase } from '../application/useCases/login.use-case';
import { Request, Response } from 'express';
import { RefreshUseCase } from '../application/useCases/refresh.use-case';
import { AtPublic } from 'src/common/decorators/accessPublic.decorator';
import { LogoutUseCase } from '../application/useCases/logout.use-case';

@AtPublic()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly registrationUseCase: RegistrationUseCase,
		private readonly loginUseCase: LoginUseCase,
		private readonly refreshUseCase: RefreshUseCase,
		private readonly logoutUseCase: LogoutUseCase,
	) {}

	@HttpCode(201)
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

	@HttpCode(200)
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

	@HttpCode(200)
	@Post('refresh')
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<AccessToken> {
		const refresh_token = req.cookies.refresh_token;
		const tokens = await this.refreshUseCase.execute(refresh_token);

		res.cookie('refresh_token', tokens.refresh_token, {
			maxAge: 3600 * 1000 * 168,
			httpOnly: true,
		});

		return {
			access_token: tokens.access_token,
		};
	}

	@HttpCode(200)
	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<string> {
		const refresh_token = req.cookies.refresh_token;
		await this.logoutUseCase.execute(refresh_token);
		res.clearCookie('refresh_token');
		return 'Вы успешно вышли из системы.';
	}
}
