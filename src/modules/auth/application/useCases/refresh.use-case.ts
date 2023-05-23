import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { UsersQueryRepository } from '../../../users/infrastructure/users.query.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokensViewModel } from '../dto/view/tokens.view-model';

export class RefreshCommand {
	public refresh_token: string;
	constructor(refresh_token: string) {
		this.refresh_token = refresh_token;
	}
}
@CommandHandler(RefreshCommand)
export class RefreshUseCase implements ICommandHandler<RefreshCommand> {
	constructor(private readonly authService: AuthService, private readonly usersQueryRepository: UsersQueryRepository) {}
	async execute(command: RefreshCommand): Promise<TokensViewModel> {
		const { refresh_token } = command;
		const decodeUser = await this.authService.decodeToken(refresh_token);
		const userByEmail = await this.usersQueryRepository.getUserByEmail(decodeUser.email);

		if (!userByEmail) {
			throw new HttpException('This user was not found', HttpStatus.NOT_FOUND);
		}

		return await this.authService.generateTokens(userByEmail);
	}
}
