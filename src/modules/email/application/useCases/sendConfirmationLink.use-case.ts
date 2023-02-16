import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class SendConfirmationLinkUseCase {
	async execute(email: string, confirmationCode: string): Promise<void> {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'alexshowmanbis@gmail.com',
				pass: 'zrmyokufmifqyzzq',
			},
		});

		let info = await transporter.sendMail({
			to: email,
			subject: 'Bravo-Soft: Подтвердите ваш Email',
			html: `<a href="http://localhost:5000/email/confirmation/${confirmationCode}"><b>Ссылка для подтверждения почты</b></a>.`,
		});
		console.log(info);
	}
}
