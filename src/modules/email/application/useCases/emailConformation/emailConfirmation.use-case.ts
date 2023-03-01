import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersRepository } from '../../../../users/infrastructure/users.repository';

@Injectable()
export class EmailConfirmationUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute(confirmationCode: string): Promise<void> {
		const allUsers = await this.usersRepository.findMany({ relations: ['emailConfirmation'] });
		console.log(allUsers);
		const user = allUsers.filter((user) => user.emailConfirmation.confirmationCode === confirmationCode)[0];

		if (!user) {
			throw new HttpException('The link has expired.', HttpStatus.BAD_REQUEST);
		}

		user.emailConfirmation.confirmationCode = '';
		user.emailConfirmation.isConfirmed = true;
		await this.usersRepository.save(user);
	}
}
