import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { PostsEntity } from '../../domain/entity/posts.entity';
import { UsersQueryRepository } from '../../../users/infrastructure/users.query.repository';

@Injectable()
export class GetPostsByUserIdUseCase {
	constructor(private readonly usersQueryRepository: UsersQueryRepository) {}
	async execute(id: string): Promise<PostsEntity> {
		try {
			const userWithPosts = await this.usersQueryRepository.getUserByIdWithPosts(id);

			if (!userWithPosts) {
				throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
			}
			return userWithPosts.posts;
		} catch (err) {
			throw new HttpException('The id is incorrect.', HttpStatus.NOT_FOUND);
		}
	}
}
