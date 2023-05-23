import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserFromJwtTokenViewModel } from 'src/modules/users/application/dto/userFromJwtToken.view-model';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { UsersQueryRepository } from '../../users/infrastructure/users.query.repository';

@Injectable()
export class EmailService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly usersQueryRepository: UsersQueryRepository,
	) {}

	async antiSpamFeedback(user: UserFromJwtTokenViewModel): Promise<void> {
		const allUsers = await this.usersQueryRepository.getAllUsersWithAllRelations(); // Логика проверки на спам. Отправка фидбэка раз в 5 минут.
		const userById = allUsers.filter((userItem) => userItem.feedbackTime.userId === user.id)[0];

		const lastSendFeedbackTime = userById.feedbackTime.createdAt;
		const timeNow = new Date();

		if (!lastSendFeedbackTime) {
			userById.feedbackTime.createdAt = timeNow;
			await this.usersRepository.save(userById);
		} else {
			const timeDifference = timeNow.getTime() - lastSendFeedbackTime.getTime();
			if (timeDifference < 300000) {
				throw new HttpException('Wait 5 minutes and try again.', HttpStatus.BAD_REQUEST);
			}
			const newDate = new Date(timeNow);
			userById.feedbackTime.createdAt = newDate;
			await this.usersRepository.save(userById);
		}
	}
}
