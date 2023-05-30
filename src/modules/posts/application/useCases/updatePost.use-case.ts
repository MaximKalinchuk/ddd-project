import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreatePostInputModel } from '../../api/models/input/createPost.input-modul';
import { PostsEntity } from '../../domain/entity/posts.entity';
import { PostsQueryRepository } from '../../infrastructure/posts.query.repository';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EXCEPTION_POST_MESSAGES } from '@lib/constants/exception.messages.enum';

export class UpdatePostCommand {
	public id: string;
	public title: string;
	public description: string;
	public img: string;
	constructor(id: string, postData: CreatePostInputModel) {
		this.id = id;
		this.title = postData.title;
		this.description = postData.description;
		this.img = postData.img;
	}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostUseCase implements ICommandHandler<UpdatePostCommand> {
	constructor(
		private readonly postsQueryRepository: PostsQueryRepository,
		private readonly postsRepository: PostsRepository,
	) {}

	async execute(command: UpdatePostCommand): Promise<PostsEntity> {
		const { id, ...postData } = command;
		const post = await this.postsQueryRepository.getPostById(id);
		if (!post) {
			throw new NotFoundException(EXCEPTION_POST_MESSAGES.POST_NOT_FOUND_404);
		}

		const updatedPost = Object.assign(post, postData);
		return await this.postsRepository.save(updatedPost);
	}
}
