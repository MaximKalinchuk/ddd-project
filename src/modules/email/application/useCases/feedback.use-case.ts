import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { FeedbackInputModel } from '../../api/models/feedback.input-model';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { UserFromJwtTokenViewModel } from 'src/modules/users/application/dto/userFromJwtToken.view-model';
import { EmailService } from '../email.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EXCEPTION_EMAIL_MESSAGES } from 'src/constants/exception.messages.enum';
const nodemailer = require('nodemailer');

export class FeedbackCommand {
	public email: string;
	public message: string;
	public subject: string;
	public user: UserFromJwtTokenViewModel;
	constructor(sendData: FeedbackInputModel, user: UserFromJwtTokenViewModel) {
		this.email = sendData.email;
		this.message = sendData.message;
		this.subject = sendData.subject;
		this.user = user;
	}
}

@CommandHandler(FeedbackCommand)
export class FeedbackUseCase implements ICommandHandler<FeedbackCommand> {
	constructor(private readonly emailService: EmailService) {}
	async execute(command: FeedbackCommand): Promise<void> {
		await this.emailService.antiSpamFeedback(command.user);
		try {
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'alexshowmanbis@gmail.com',
					pass: 'zrmyokufmifqyzzq',
				},
			});

			let info = await transporter.sendMail({
				to: 'kalinchuk.maxim@mail.ru',
				subject: `${command.user}: ${command.subject}`,
				html: command.message,
			});
		} catch (e) {
			throw new BadRequestException(EXCEPTION_EMAIL_MESSAGES.EMAIL_FEEDBACK_ERROR_400);
		}
	}
}
