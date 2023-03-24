import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';

@Injectable()
export class DeletePostUseCase {
	constructor(private readonly postsRepository: PostsRepository) {}

	async execute(id: string) {
		const post = await this.postsRepository.findOne({ where: { id } });
		if (!post) {
			throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);
		}
		await this.postsRepository.remove(post);
		return 'Post was deleted.';
	}
}
