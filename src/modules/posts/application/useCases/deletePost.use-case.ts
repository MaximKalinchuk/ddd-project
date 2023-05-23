import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { PostsQueryRepository } from '../../infrastructure/posts.query.repository';

@Injectable()
export class DeletePostUseCase {
	constructor(
		private readonly postsQueryRepository: PostsQueryRepository,
		private readonly postsRepository: PostsRepository,
	) {}

	async execute(id: string) {
		const post = await this.postsQueryRepository.getPostById(id);
		if (!post) {
			throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);
		}
		await this.postsRepository.delete(id);
		return 'Post was deleted.';
	}
}
