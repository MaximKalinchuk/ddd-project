import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostInputModel } from '../../api/models/createPost.input-modul';
import { PostsEntity } from '../../domain/entity/posts.entity';
import { PostsRepository } from '../../infrastructure/posts.repository';

@Injectable()
export class UpdatePostUseCase {
	constructor(private readonly postsRepository: PostsRepository) {}

	async execute(id: string, postData: CreatePostInputModel): Promise<PostsEntity> {
		const post = await this.postsRepository.findOne({ where: { id: id } });
		if (!post) {
			throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);
		}

		const updatedPost = Object.assign(post, postData);
		return await this.postsRepository.save(updatedPost);
	}
}
