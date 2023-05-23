import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostInputModel } from '../../api/models/input/createPost.input-modul';
import { PostsEntity } from '../../domain/entity/posts.entity';
import { PostsQueryRepository } from '../../infrastructure/posts.query.repository';
import { PostsRepository } from '../../infrastructure/posts.repository';

@Injectable()
export class UpdatePostUseCase {
	constructor(
		private readonly postsQueryRepository: PostsQueryRepository,
		private readonly postsRepository: PostsRepository,
	) {}

	async execute(id: string, postData: CreatePostInputModel): Promise<PostsEntity> {
		const post = await this.postsQueryRepository.getPostById(id);
		if (!post) {
			throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);
		}

		const updatedPost = Object.assign(post, postData);
		return await this.postsRepository.save(updatedPost);
	}
}
