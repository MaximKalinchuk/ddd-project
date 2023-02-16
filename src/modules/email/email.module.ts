import { Module } from '@nestjs/common';
import { EmailController } from './api/email.controller';
import { EmailService } from './application/email.service';
import { FeedbackUseCase } from './application/useCases/feedback.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationEntity } from './domain/entity/confirmations.entity';
import { ConfirmationRepository } from './infrastructure/confirmations.repository';
import { SendConfirmationLinkUseCase } from './application/useCases/sendConfirmationLink.use-case';
import { ConfirmationUseCase } from './application/useCases/confirmation.use-case';

const useCases = [FeedbackUseCase, SendConfirmationLinkUseCase, ConfirmationUseCase];
const adapters = [ConfirmationRepository];

@Module({
	imports: [TypeOrmModule.forFeature([ConfirmationEntity])],
	controllers: [EmailController],
	providers: [EmailService, ...useCases, ...adapters],
	exports: [ConfirmationRepository, SendConfirmationLinkUseCase, ConfirmationUseCase],
})
export class EmailModule {}
