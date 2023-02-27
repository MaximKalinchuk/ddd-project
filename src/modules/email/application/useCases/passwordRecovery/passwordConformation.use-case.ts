import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PasswordRepository } from 'src/modules/email/infrastructure/password.repository';
import { UsersRepository } from '../../../../users/infrastructure/users.repository';

@Injectable()
export class PasswordConformationUseCase {
	constructor(
		private readonly passwordRepository: PasswordRepository,
		private readonly usersRepository: UsersRepository,
	) {}
	async execute(confirmationCode: string): Promise<void> {
		const confirmation = await this.passwordRepository.findOne({ where: { confirmationCode } });

		if (!confirmation) {
			throw new HttpException('The link has expired.', HttpStatus.BAD_REQUEST);
		}

		const user = await this.usersRepository.findOne({ where: { id: confirmation.userId } });

		user.passwordHash = confirmation.newPassword;
		await this.usersRepository.save(user);

		confirmation.newPassword = null;
		confirmation.confirmationCode = null;
		await this.passwordRepository.save(confirmation);
	}
}
