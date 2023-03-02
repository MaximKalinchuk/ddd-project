import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/users.repository';
import { PostsEntity } from '../../domain/entity/posts.entity';

@Injectable()
export class GetPostsByUserIdUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}
	async execute(id: string): Promise<PostsEntity> {
		try {
			const userWithPosts = await this.usersRepository.findOne({ where: { id: String(id) }, relations: ['posts'] });

			if (!userWithPosts) {
				throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
			}
			return userWithPosts.posts;
		} catch (err) {
			throw new HttpException('The id is incorrect.', HttpStatus.NOT_FOUND);
		}
	}
}
