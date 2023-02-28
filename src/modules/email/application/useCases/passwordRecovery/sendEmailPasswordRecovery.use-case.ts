import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PasswordRecovery } from 'src/modules/email/api/models/passwordRecovery.input-model';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
const nodemailer = require('nodemailer');
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

@Injectable()
export class SendEmailPasswordRecoveryLinkUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute(userData: PasswordRecovery): Promise<void> {
		const user = await this.usersRepository.findOne({
			where: { email: userData.email },
			relations: ['passwordRecovery'],
		});

		if (!user) {
			throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
		}

		try {
			const confirmationCode: string = uuidv4();
			const passwordHash: string = await bcrypt.hash(userData.password, 10);
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'alexshowmanbis@gmail.com',
					pass: 'zrmyokufmifqyzzq',
				},
			});
			let info = await transporter.sendMail({
				to: userData.email,
				subject: 'Bravo-Soft: Восстановление пароля',
				html: `<p><b>Подтвердите новый пароль:</b></p><br>
			<a href="http://localhost:5000/email/confirmation/password/${confirmationCode}">Ссылка для замены пароля</a>.<br>
			<p>Если аккаунт не активировался, попробуйте зарегистрироваться заново или использовать новую почту. 
			Также сообщите о проблеме администрации проекта. Спасибо!</p>
			`,
			});

			user.passwordRecovery.confirmationCode = confirmationCode;
			user.passwordRecovery.newPassword = passwordHash;

			await this.usersRepository.save(user);
		} catch (e) {
			const user = await this.usersRepository.findOne({
				where: { email: userData.email },
				relations: ['passwordRecovery'],
			});
			user.passwordRecovery.confirmationCode = null;
			user.passwordRecovery.newPassword = null;

			throw new HttpException('Failed to send email confirmation message.', HttpStatus.BAD_REQUEST);
		}
	}
}
