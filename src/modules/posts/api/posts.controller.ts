import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { PostsEntity } from '../domain/entity/posts.entity';
import { GetPostsByUserIdUseCase } from './queryRepository/getPostsByUserId.queryRepository';
import { GetPostsByParamsUseCase } from './queryRepository/getPostsByParams.queryRepository';
import { GetAllPostsUseCase } from './queryRepository/getAllPosts.queryRepository';
import { GetPostByIdUseCase } from './queryRepository/getPostById.queryRepository';
import { CreatePostInputModel } from './models/createPost.input-modul';
import { CreatePostUseCase } from '../application/useCases/createPost.use-case';
import { Request } from 'express';
import { UserFromJwtTokenViewModel } from 'src/modules/users/application/dto/userFromJwtToken.view-model';
import { UpdatePostUseCase } from '../application/useCases/updatePost.use-case';
import { DeletePostUseCase } from '../application/useCases/deletePost.use-case';

@Controller('posts')
export class PostsController {
	constructor(
		private readonly getPostsByUserIdUseCase: GetPostsByUserIdUseCase,
		private readonly getPostsByParamsUseCase: GetPostsByParamsUseCase,
		private readonly getAllPostsUseCase: GetAllPostsUseCase,
		private readonly getPostByIdUseCase: GetPostByIdUseCase,
		private readonly createPostUseCase: CreatePostUseCase,
		private readonly updatePostUseCase: UpdatePostUseCase,
		private readonly deletePostUseCase: DeletePostUseCase,
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

	@Get('user/:id')
	async getAllUserPosts(@Param('id') id: string): Promise<PostsEntity> {
		return await this.getPostsByUserIdUseCase.execute(id);
	}

	@Get(':id')
	async getPostById(@Param('id') id: string): Promise<PostsEntity> {
		return await this.getPostByIdUseCase.execute(id);
	}

	@Post()
	async createPost(@Body() postData: CreatePostInputModel, @Req() req: Request): Promise<PostsEntity> {
		const user = req.user as UserFromJwtTokenViewModel;
		return await this.createPostUseCase.execute(user.id, postData);
	}

	@Put(':id')
	async updatePost(@Param('id') id: string, @Body() postData: CreatePostInputModel): Promise<PostsEntity> {
		return await this.updatePostUseCase.execute(id, postData);
	}

	@Delete(':id')
	async deletePost(@Param('id') id: string): Promise<string> {
		return await this.deletePostUseCase.execute(id);
	}
}
