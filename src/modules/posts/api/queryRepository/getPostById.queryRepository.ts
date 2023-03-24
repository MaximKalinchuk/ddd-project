import { PostsEntity } from '../../domain/entity/posts.entity';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetPostByIdUseCase {
	constructor(private readonly postsRepository: PostsRepository) {}

	async execute(id: string): Promise<PostsEntity> {
		return await this.postsRepository.findOne({ where: { id } });
	}
}
