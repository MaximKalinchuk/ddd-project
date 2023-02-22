import { Module } from '@nestjs/common';
import { EmailController } from './api/email.controller';
import { EmailService } from './application/email.service';
import { FeedbackUseCase } from './application/useCases/feedback.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailConfirmationEntity } from './domain/entity/emailConfirmation.entity';
import { ConfirmationRepository } from './infrastructure/confirmations.repository';
import { SendEmailConfirmationLinkUseCase } from './application/useCases/sendConfirmationLink.use-case';
import { EmailConfirmationUseCase } from './application/useCases/emailConfirmation.use-case';
import { UsersModule } from '../users/users.module';
import { PasswordRecoveryUseCase } from './application/useCases/passwordRecovery.use-case';

const useCases = [FeedbackUseCase, SendEmailConfirmationLinkUseCase, EmailConfirmationUseCase, PasswordRecoveryUseCase];
const adapters = [ConfirmationRepository];

@Module({
	imports: [TypeOrmModule.forFeature([EmailConfirmationEntity]), UsersModule],
	controllers: [EmailController],
	providers: [EmailService, ...useCases, ...adapters],
	exports: [ConfirmationRepository, SendEmailConfirmationLinkUseCase, EmailConfirmationUseCase],
})
export class EmailModule {}
