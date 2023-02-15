import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackUseCase } from '../application/useCases/feedback.use-case';
import { FeedbackInputModel } from './models/feedback.input-model';

@Controller('email')
export class EmailController {
	constructor(private readonly feedbackUseCase: FeedbackUseCase) {}

	@Post()
	async feedback(@Body() sendData: FeedbackInputModel): Promise<void> {
		await this.feedbackUseCase.expect(sendData);
	}
}
