import { Injectable } from '@nestjs/common';
import { FeedbackInputModel } from '../../api/models/feedback.input-model';
const nodemailer = require('nodemailer');

@Injectable()
export class FeedbackUseCase {
	async expect(sendData: FeedbackInputModel): Promise<void> {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'alexshowmanbis@gmail.com', // generated ethereal user
				pass: 'zrmyokufmifqyzzq', // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			to: 'kalinchuk.maxim@mail.ru', // list of receivers
			subject: `${sendData.email}: ${sendData.subject}`, // Subject line
			html: sendData.message, // html body
		});
		console.log(info);
	}
}
