import { CreatePostInputModel } from '../../api/models/input/createPost.input-modul';
import { PostsEntity } from '../../domain/entity/posts.entity';
import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';

@Injectable()
export class CreatePostUseCase {
	constructor(private readonly postsRepository: PostsRepository) {}

	async execute(userId: string, postData: CreatePostInputModel): Promise<PostsEntity> {
		const post = new PostsEntity(userId, postData);
		return await this.postsRepository.save(post);
	}
}
