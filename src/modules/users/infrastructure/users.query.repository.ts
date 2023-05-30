import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'src/modules/base/base.repository.abstract';
import { UsersEntity } from '../domain/entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from 'src/modules/posts/domain/entity/posts.entity';
import { EXCEPTION_USER_MESSAGES } from '@lib/constants/exception.messages.enum';
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
		const user = await this.usersRepository.findOne({ where: { id: String(id) }, relations: { posts: true } });
		if (!user) {
			throw new NotFoundException(EXCEPTION_USER_MESSAGES.USER_NOT_FOUND_404);
		}
		return user;
	}

	async getPostsUserById(id): Promise<PostsEntity[]> {
		const user = await this.usersRepository.findOne({ where: { id: String(id) }, relations: { posts: true } });
		if (!user) {
			throw new NotFoundException(EXCEPTION_USER_MESSAGES.USER_NOT_FOUND_404);
		}
		return user.posts;
	}

	async getUserById(id): Promise<UsersEntity> {
		return await this.usersRepository.findOne({ where: { id: String(id) } });
	}

	async getUserByEmailWithAllRelations(email: string) {
		return await this.usersRepository.findOne({
			where: { email },
			relations: { passwordRecovery: true, emailConfirmation: true, feedbackTime: true, posts: true },
		});
	}

	async getAllUsersWithAllRelations() {
		return await this.usersRepository.find({
			relations: { passwordRecovery: true, emailConfirmation: true, feedbackTime: true },
		});
	}
	async getUserByEmailWithEmailConfirmation(email: string): Promise<UsersEntity> {
		return await this.usersRepository.findOne({
			where: { email },
			relations: { emailConfirmation: true },
		});
	}
}
