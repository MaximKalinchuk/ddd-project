import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FeedbackInputModel } from '../../api/models/feedback.input-model';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { UserFromJwtTokenViewModel } from 'src/modules/users/application/dto/userFromJwtToken.view-model';
import { EmailService } from '../email.service';
const nodemailer = require('nodemailer');

@Injectable()
export class FeedbackUseCase {
	constructor(private readonly emailService: EmailService) {}
	async expect(sendData: FeedbackInputModel, user: UserFromJwtTokenViewModel): Promise<void> {
		await this.emailService.antiSpamFeedback(user);
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
				subject: `${user}: ${sendData.subject}`,
				html: sendData.message,
			});
		} catch (e) {
			throw new HttpException('Failed to send feedback.', HttpStatus.BAD_REQUEST);
		}
	}
}
