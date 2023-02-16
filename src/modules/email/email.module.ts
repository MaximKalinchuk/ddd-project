import { Module } from '@nestjs/common';
import { EmailController } from './api/email.controller';
import { EmailService } from './application/email.service';
import { FeedbackUseCase } from './application/useCases/feedback.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationEntity } from './domain/entity/confirmations.entity';
import { ConfirmationRepository } from './infrastructure/confirmations.repository';

const useCases = [FeedbackUseCase];
const adapters = [ConfirmationRepository];

@Module({
	imports: [TypeOrmModule.forFeature([ConfirmationEntity])],
	controllers: [EmailController],
	providers: [EmailService, ...useCases, ...adapters],
	exports: [ConfirmationRepository],
})
export class EmailModule {}
