import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostsEntity } from '../domain/entity/posts.entity';
import { GetPostsByUserIdUseCase } from './queryRepository/getPostsByUserId.queryRepository';
import { GetPostsByParamsUseCase } from './queryRepository/getPostsByParams.queryRepository';
import { GetAllPostsUseCase } from './queryRepository/getAllPosts.queryRepository';

@Controller('posts')
export class PostsController {
	constructor(
		private readonly getPostsByUserIdUseCase: GetPostsByUserIdUseCase,
		private readonly getPostsByParamsUseCase: GetPostsByParamsUseCase,
		private readonly getAllPostsUseCase: GetAllPostsUseCase,
	) {}

	@Get()
	async getAllPosts() {
		return await this.getAllPostsUseCase.execute();
	}

	@Get('findByParams')
	async getPostsByParams(@Query() params) {
		console.log(params);
		return await this.getPostsByParamsUseCase.execute(params);
	}

	@Get(':id')
	async getAllUserPorts(@Param('id') id: string): Promise<PostsEntity> {
		return await this.getPostsByUserIdUseCase.execute(id);
	}
}
