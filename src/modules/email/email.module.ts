import { Module } from '@nestjs/common';
import { EmailController } from './api/email.controller';
import { EmailService } from './application/email.service';
import { FeedbackUseCase } from './application/useCases/feedback.use-case';

const useCases = [FeedbackUseCase];
const adapters = [];

@Module({
	imports: [],
	controllers: [EmailController],
	providers: [EmailService, ...useCases, ...adapters],
	exports: [],
})
export class EmailModule {}
