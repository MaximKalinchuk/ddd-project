import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../../users/infrastructure/users.repository';

@Injectable()
export class PasswordConformationUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}
	
	async execute(confirmationCode: string): Promise<void> {
		const allUsers = await this.usersRepository.findMany({
			relations: ['passwordRecovery'],
		});

		const user = allUsers.filter((user) => user.passwordRecovery.confirmationCode === confirmationCode)[0];
		if (!user) {
			throw new HttpException('The link has expired.', HttpStatus.BAD_REQUEST);
		}

		user.passwordHash = user.passwordRecovery.newPassword;
		user.passwordRecovery.newPassword = null;
		user.passwordRecovery.confirmationCode = null;
		await this.usersRepository.save(user);
	}
}
