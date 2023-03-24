import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { PostsEntity } from '../../domain/entity/posts.entity';

@Injectable()
export class GetPostsByParamsUseCase {
	constructor(private readonly postsRepository: PostsRepository) {}
	async execute(params) {
		const { PageSize, PageNumber, id } = params;
		const skipSize = (PageNumber - 1) * PageSize;
		console.log(skipSize);

		// return await PostsEntity.find({ order: { title: 'DESC' }, skip: skipSize, where: { users: { id } } });
		return await this.postsRepository.findMany({
			where: { user: { id } },
			order: { title: 'ASC' },
			skip: skipSize,
			take: PageSize,
		});
	}
}
