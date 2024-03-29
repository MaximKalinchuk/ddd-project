import { Module } from '@nestjs/common';
import { EmailController } from './api/email.controller';
import { EmailService } from './application/email.service';
import { FeedbackUseCase } from './application/useCases/feedback.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailConfirmationEntity } from './domain/entity/emailConfirmation.entity';
import { EmailConfirmationUseCase } from './application/useCases/emailConformation/emailConfirmation.use-case';
import { UsersModule } from '../users/users.module';
import { PasswordRecoveryEntity } from './domain/entity/passwordRecovery.entity';
import { PasswordConformationUseCase } from './application/useCases/passwordRecovery/passwordConformation.use-case';
import { SendEmailConfirmationLinkUseCase } from './application/useCases/emailConformation/sendEmailConfirmationLink.use-case';
import { SendEmailPasswordRecoveryLinkUseCase } from './application/useCases/passwordRecovery/sendEmailPasswordRecovery.use-case';
import { AntiSpamFeedbackTime } from './domain/entity/antiSpamFeedbackTime.entity';
import { CqrsModule } from '@nestjs/cqrs';

const useCases = [
	FeedbackUseCase,
	SendEmailConfirmationLinkUseCase,
	EmailConfirmationUseCase,
	SendEmailPasswordRecoveryLinkUseCase,
	PasswordConformationUseCase,
];
const adapters = [];

@Module({
	imports: [
		TypeOrmModule.forFeature([EmailConfirmationEntity, PasswordRecoveryEntity, AntiSpamFeedbackTime]),
		UsersModule,
		CqrsModule,
	],
	controllers: [EmailController],
	providers: [EmailService, ...useCases, ...adapters],
	exports: [SendEmailConfirmationLinkUseCase, EmailConfirmationUseCase],
})
export class EmailModule {}
