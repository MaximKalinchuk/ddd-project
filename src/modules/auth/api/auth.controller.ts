import { Body, Controller, HttpCode, HttpStatus, Logger, Post, Req, Res } from '@nestjs/common';
import { CreateUserInputModel } from 'src/modules/users/api/models/createUser.input-modal';
import { RegistrationCommand, RegistrationUseCase } from '../application/useCases/registration.use-case';
import { LoginInputModel } from './models/input/login.input-model';
import { LoginCommand, LoginUseCase } from '../application/useCases/login.use-case';
import { Request, Response } from 'express';
import { RefreshCommand, RefreshUseCase } from '../application/useCases/refresh.use-case';
import { AtPublic } from 'src/common/decorators/accessPublic.decorator';
import { LogoutCommand, LogoutUseCase } from '../application/useCases/logout.use-case';
import { CommandBus } from '@nestjs/cqrs';
import { AccessToken } from '../application/dto/view/registration.view-model';

@AtPublic()
@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(private readonly commandBus: CommandBus) {}

	@HttpCode(201)
	@Post('registration')
	async registration(
		@Body() userData: CreateUserInputModel,
		@Res({ passthrough: true }) res: Response,
	): Promise<AccessToken> {
		this.logger.log(`Пользователь ${userData.email} пытается зарегистрироваться`);
		const tokens = await this.commandBus.execute(new RegistrationCommand(userData));
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
		this.logger.log(`Пользователь ${userData.email} пытается войти в систему`);
		const tokens = await this.commandBus.execute(new LoginCommand(userData));
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
		const tokens = await this.commandBus.execute(new RefreshCommand(refresh_token));

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
		await this.commandBus.execute(new LogoutCommand(refresh_token));
		res.clearCookie('refresh_token');
		return 'Вы успешно вышли из системы.';
	}
}
