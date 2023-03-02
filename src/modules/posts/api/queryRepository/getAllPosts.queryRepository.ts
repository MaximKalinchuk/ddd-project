import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';

@Injectable()
export class GetAllPostsUseCase {
	constructor(private readonly postsRepository: PostsRepository) {}
	async execute() {
		return await this.postsRepository.findMany({});
	}
}
