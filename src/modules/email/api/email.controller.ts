import { Body, Controller, Param, Post, HttpCode } from '@nestjs/common';
import { ConfirmationUseCase } from '../application/useCases/confirmation.use-case';
import { FeedbackUseCase } from '../application/useCases/feedback.use-case';
import { FeedbackInputModel } from './models/feedback.input-model';

@Controller('email')
export class EmailController {
	constructor(
		private readonly feedbackUseCase: FeedbackUseCase,
		private readonly confirmationUseCase: ConfirmationUseCase,
	) {}

	@HttpCode(200)
	@Post()
	async feedback(@Body() sendData: FeedbackInputModel): Promise<void> {
		await this.feedbackUseCase.expect(sendData);
	}

	@HttpCode(200)
	@Post('confirmation/:confirmationCode')
	async confirmation(@Param('confirmationCode') confirmationCode: string): Promise<void> {
		await this.confirmationUseCase.execute(confirmationCode);
	}
}
