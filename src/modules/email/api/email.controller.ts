import { Body, Controller, Param, Post, HttpCode } from '@nestjs/common';
import { EmailConfirmationUseCase } from '../application/useCases/emailConfirmation.use-case';
import { FeedbackUseCase } from '../application/useCases/feedback.use-case';
import { PasswordRecoveryUseCase } from '../application/useCases/passwordRecovery.use-case';
import { FeedbackInputModel } from './models/feedback.input-model';

@Controller('email')
export class EmailController {
	constructor(
		private readonly feedbackUseCase: FeedbackUseCase,
		private readonly emailConfirmationUseCase: EmailConfirmationUseCase,
		private readonly passwordRecoveryUseCase: PasswordRecoveryUseCase,
	) {}

	@HttpCode(200)
	@Post()
	async feedback(@Body() sendData: FeedbackInputModel): Promise<void> {
		await this.feedbackUseCase.expect(sendData);
	}

	@HttpCode(200)
	@Post('emailConfirmation/:confirmationCode')
	async emailConfirmation(@Param('confirmationCode') confirmationCode: string): Promise<void> {
		await this.emailConfirmationUseCase.execute(confirmationCode);
	}

	@HttpCode(200)
	@Post('passwordRecovery/:confirmationCode')
	async passwordRecovery(@Param('confirmationCode') confirmationCode: string): Promise<void> {
		await this.passwordRecoveryUseCase.execute(confirmationCode);
	}
}
