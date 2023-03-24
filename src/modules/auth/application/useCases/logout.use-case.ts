import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { AuthService } from '../auth.service';

@Injectable()
export class LogoutUseCase {
	constructor(private readonly authService: AuthService, private readonly usersRepository: UsersRepository) {}
	async execute(refresh_token): Promise<void> {
		const user = await this.authService.decodeToken(refresh_token);

		const userById = await this.usersRepository.findOne({ where: { id: user.id } });
		if (!userById) {
			throw new UnauthorizedException();
		}

		userById.refresh_token = null;
		await this.usersRepository.save(userById);
	}
}
