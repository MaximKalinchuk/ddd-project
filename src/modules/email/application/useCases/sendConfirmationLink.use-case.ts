import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { ConfirmationRepository } from '../../infrastructure/confirmations.repository';
const nodemailer = require('nodemailer');

@Injectable()
export class SendEmailConfirmationLinkUseCase {
	constructor(
		private readonly confirmationRepository: ConfirmationRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute(email: string, confirmationCode: string): Promise<void> {
		try {
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
		} catch (e) {
			const user = await this.usersRepository.findOne({ where: { email } });
			const confirmation = await this.confirmationRepository.findOne({ where: { userId: user.id } });
			await this.confirmationRepository.remove(confirmation);

			await this.usersRepository.remove(user);

			throw new HttpException('Failed to send email confirmation message.', HttpStatus.BAD_REQUEST);
		}
	}
}
