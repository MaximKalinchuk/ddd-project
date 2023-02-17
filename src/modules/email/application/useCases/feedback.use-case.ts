import { Injectable } from '@nestjs/common';
import { FeedbackInputModel } from '../../api/models/feedback.input-model';
const nodemailer = require('nodemailer');

@Injectable()
export class FeedbackUseCase {
	async expect(sendData: FeedbackInputModel): Promise<void> {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'alexshowmanbis@gmail.com',
				pass: 'zrmyokufmifqyzzq',
			},
		});

		let info = await transporter.sendMail({
			to: 'kalinchuk.maxim@mail.ru',
			subject: `${sendData.email}: ${sendData.subject}`,
			html: sendData.message,
		});
	}
}
