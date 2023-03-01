import { Body, Controller, Param, Post, HttpCode, Get } from '@nestjs/common';
import { EmailConfirmationUseCase } from '../application/useCases/emailConformation/emailConfirmation.use-case';
import { FeedbackUseCase } from '../application/useCases/feedback.use-case';
import { PasswordConformationUseCase } from '../application/useCases/passwordRecovery/passwordConformation.use-case';
import { SendEmailPasswordRecoveryLinkUseCase } from '../application/useCases/passwordRecovery/sendEmailPasswordRecovery.use-case';
import { FeedbackInputModel } from './models/feedback.input-model';
import { PasswordRecovery } from './models/passwordRecovery.input-model';

@Controller('email')
export class EmailController {
	constructor(
		private readonly feedbackUseCase: FeedbackUseCase,
		private readonly emailConfirmationUseCase: EmailConfirmationUseCase,
		private readonly passwordConformationUseCase: PasswordConformationUseCase,
		private readonly sendEmailPasswordRecoveryLinkUseCase: SendEmailPasswordRecoveryLinkUseCase,
	) {}

	@HttpCode(200)
	@Post()
	async feedback(@Body() sendData: FeedbackInputModel): Promise<void> {
		await this.feedbackUseCase.expect(sendData);
	}

	@HttpCode(200)
	@Get('emailConfirmation/:confirmationCode')
	async emailConfirmation(@Param('confirmationCode') confirmationCode: string): Promise<void> {
		console.log(confirmationCode);
		await this.emailConfirmationUseCase.execute(confirmationCode);
	}

	@HttpCode(200)
	@Post('passwordRecovery')
	async sendEmailPasswordRecovery(@Body() userData: PasswordRecovery): Promise<void> {
		await this.sendEmailPasswordRecoveryLinkUseCase.execute(userData);
	}

	@HttpCode(200)
	@Get('confirmation/password/:confirmationCode')
	async passwordRecovery(@Param('confirmationCode') confirmationCode: string): Promise<void> {
		await this.passwordConformationUseCase.execute(confirmationCode);
	}
}
