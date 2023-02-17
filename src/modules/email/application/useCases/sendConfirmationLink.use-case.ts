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
			html: `<p><b>Подтвердите ваш почту, для продолжения работы:</b></p><br>
			<a href="http://localhost:5000/email/confirmation/${confirmationCode}">Ссылка для подтверждения почты</a>.<br>
			<p>Если аккаунт не активировался, попробуйте зарегистрироваться занова или использовать новую почту. 
			Также сообщите о проблеме администрации проекта. Спасибо!</p>
			`,
		});
	}
}
