import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PasswordRecovery } from 'src/modules/email/api/models/passwordRecovery.input-model';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
const nodemailer = require('nodemailer');
import { v4 as uuidv4 } from 'uuid';
import { UsersQueryRepository } from '../../../../users/infrastructure/users.query.repository';
const bcrypt = require('bcrypt');

// ???
@Injectable()
export class SendEmailPasswordRecoveryLinkUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly usersQueryRepository: UsersQueryRepository,
	) {}

	async execute(userData: PasswordRecovery): Promise<void> {
		const user = await this.usersQueryRepository.getUserByEmailWithAllRelations(userData.email);

		if (!user) {
			throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
		}

		if (!user.emailConfirmation.isConfirmed) {
			throw new HttpException(
				'Please confirm your account. The message was sent to the mail during registration.',
				HttpStatus.BAD_REQUEST,
			);
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
			const user = await this.usersQueryRepository.getUserByEmailWithAllRelations(userData.email);
			user.passwordRecovery.confirmationCode = null;
			user.passwordRecovery.newPassword = null;

			throw new HttpException('Failed to send email confirmation message.', HttpStatus.BAD_REQUEST);
		}
	}
}
