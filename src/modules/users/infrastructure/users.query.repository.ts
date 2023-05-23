import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/base/base.repository.abstract';
import { UsersEntity } from '../domain/entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersQueryRepository {
	constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {}

	async getUserByEmail(email: string): Promise<UsersEntity> {
		return await this.usersRepository.findOne({ where: { email } });
	}

	async getUserByUsername(username: string): Promise<UsersEntity> {
		return await this.usersRepository.findOne({ where: { username } });
	}

	async getUserByIdWithPosts(id): Promise<UsersEntity> {
		return await this.usersRepository.findOne({ where: { id: String(id) }, relations: { posts: true } });
	}
}
