import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { UsersQueryRepository } from '../../../../users/infrastructure/users.query.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EXCEPTION_EMAIL_MESSAGES } from '@lib/constants/exception.messages.enum';
const nodemailer = require('nodemailer');

export class SendEmailConfirmationLinkCommand {
	public confirmationCode: string;
	public email: string;
	constructor(email: string, confirmationCode: string) {
		this.confirmationCode = confirmationCode;
		this.email = email;
	}
}

@CommandHandler(SendEmailConfirmationLinkCommand)
export class SendEmailConfirmationLinkUseCase implements ICommandHandler<SendEmailConfirmationLinkCommand> {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly usersQueryRepository: UsersQueryRepository,
	) {}

	async execute(command: SendEmailConfirmationLinkCommand): Promise<void> {
		const { email, confirmationCode } = command;
		try {
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'alexshowmanbis@gmail.com',
					pass: 'zrmyokufmifqyzzq',
				},
			});
			await transporter.sendMail({
				to: email,
				subject: 'Bravo-Soft: Подтвердите ваш Email',
				html: `<p><b>Подтвердите ваш почту, для продолжения работы:</b></p><br>
			<a href="http://localhost:5000/email/emailConfirmation/${confirmationCode}">Ссылка для подтверждения почты</a>.<br>
			<p>Если аккаунт не активировался, попробуйте зарегистрироваться заново или использовать новую почту. 
			Также сообщите о проблеме администрации проекта. Спасибо!</p>
			`,
			});
		} catch (e) {
			const user = await this.usersQueryRepository.getUserByEmail(email);
			await this.usersRepository.softDelete(user.id);

			throw new BadRequestException(EXCEPTION_EMAIL_MESSAGES.EMAIL_SEND_ERROR_400);
		}
	}
}
