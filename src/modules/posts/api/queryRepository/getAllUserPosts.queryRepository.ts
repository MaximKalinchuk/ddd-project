import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';

@Injectable()
export class GetAllUserPostsUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}
	async execute(id: string) {
		return await this.usersRepository.findOne({ where: { id }, relations: ['posts'] });
	}
}
