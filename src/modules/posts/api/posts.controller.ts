import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, HttpException, HttpStatus } from '@nestjs/common';
import { PostsEntity } from '../domain/entity/posts.entity';
import { GetPostsByUserIdUseCase } from './queryRepository/getPostsByUserId.queryRepository';
import { GetPostsByParamsCommand } from './queryRepository/getPostsByParams.queryRepository';
import { CreatePostInputModel } from './models/input/createPost.input-modul';
import { CreatePostUseCase } from '../application/useCases/createPost.use-case';
import { Request } from 'express';
import { UserFromJwtTokenViewModel } from 'src/modules/users/application/dto/userFromJwtToken.view-model';
import { UpdatePostUseCase } from '../application/useCases/updatePost.use-case';
import { DeletePostUseCase } from '../application/useCases/deletePost.use-case';
import { PostsQueryRepository } from '../infrastructure/posts.query.repository';
import { CommandBus } from '@nestjs/cqrs';

@Controller('posts')
export class PostsController {
	constructor(
		private readonly getPostsByUserIdUseCase: GetPostsByUserIdUseCase,
		private readonly postsQueryRepository: PostsQueryRepository,
		private readonly createPostUseCase: CreatePostUseCase,
		private readonly updatePostUseCase: UpdatePostUseCase,
		private readonly deletePostUseCase: DeletePostUseCase,
		private readonly commandBus: CommandBus,
	) {}

	@Get()
	async getAllPosts() {
		return await this.postsQueryRepository.getAllPosts();
	}

	@Get('findByParams')
	async getPostsByParams(@Query() params) {
		console.log(params);
		return await this.commandBus.execute(new GetPostsByParamsCommand(params));
	}

	@Get('user/:id')
	async getAllUserPosts(@Param('id') id: string): Promise<PostsEntity> {
		return await this.getPostsByUserIdUseCase.execute(id);
	}

	@Get(':id')
	async getPostById(@Param('id') id: string): Promise<PostsEntity> {
		return await this.postsQueryRepository.getPostById(id);
	}

	@Post()
	async createPost(@Body() postData: CreatePostInputModel, @Req() req: Request): Promise<PostsEntity> {
		const user = req.user;
		if ('id' in user) {
			if (typeof user.id === 'string') {
				return await this.createPostUseCase.execute(user.id, postData);
			}
		}
		throw new HttpException('Id not found.', HttpStatus.BAD_REQUEST);
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
