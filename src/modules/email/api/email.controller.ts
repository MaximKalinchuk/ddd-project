import { Body, Controller, Param, Post, HttpCode, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AtPublic } from 'src/common/decorators/accessPublic.decorator';
import { UserFromJwtTokenViewModel } from 'src/modules/users/application/dto/userFromJwtToken.view-model';
import { EmailConfirmationCommand } from '../application/useCases/emailConformation/emailConfirmation.use-case';
import { FeedbackCommand } from '../application/useCases/feedback.use-case';
import { PasswordConformationCommand } from '../application/useCases/passwordRecovery/passwordConformation.use-case';
import { FeedbackInputModel } from './models/feedback.input-model';
import { PasswordRecovery } from './models/passwordRecovery.input-model';
import { CommandBus } from '@nestjs/cqrs';
import { SendEmailConfirmationLinkCommand } from '../application/useCases/emailConformation/sendEmailConfirmationLink.use-case';

@Controller('email')
export class EmailController {
	constructor(private readonly commandBus: CommandBus) {}

	@HttpCode(200)
	@Post()
	async feedback(@Body() sendData: FeedbackInputModel, @Req() req: Request): Promise<void> {
		const user = req.user as UserFromJwtTokenViewModel;
		await this.commandBus.execute(new FeedbackCommand(sendData, user));
	}

	@AtPublic()
	@HttpCode(200)
	@Get('emailConfirmation/:confirmationCode')
	async emailConfirmation(@Param('confirmationCode') confirmationCode: string): Promise<void> {
		console.log(confirmationCode);
		await this.commandBus.execute(new EmailConfirmationCommand(confirmationCode));
	}

	@AtPublic()
	@HttpCode(200)
	@Post('passwordRecovery')
	async sendEmailPasswordRecovery(@Body() userData: PasswordRecovery): Promise<void> {
		await this.commandBus.execute(new SendEmailConfirmationLinkCommand(userData.email, userData.password));
	}

	@AtPublic()
	@HttpCode(200)
	@Get('confirmation/password/:confirmationCode')
	async passwordRecovery(@Param('confirmationCode') confirmationCode: string): Promise<void> {
		await this.commandBus.execute(new PasswordConformationCommand(confirmationCode));
	}
}
