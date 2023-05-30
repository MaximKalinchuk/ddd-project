import { CreatePostInputModel } from '../../api/models/input/createPost.input-modul';
import { PostsEntity } from '../../domain/entity/posts.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../../users/infrastructure/users.query.repository';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { EXCEPTION_USER_MESSAGES } from '@lib/constants/exception.messages.enum';

export class CreatePostCommand {
	public userId: string;
	public title: string;
	public description: string;
	public img: string;

	constructor(userId: string, postData: CreatePostInputModel) {
		this.userId = userId;
		this.title = postData.title;
		this.description = postData.description;
		this.img = postData.img;
	}
}

@CommandHandler(CreatePostCommand)
export class CreatePostUseCase implements ICommandHandler<CreatePostCommand> {
	private readonly logger = new Logger(CreatePostUseCase.name);
	constructor(
		private readonly postsRepository: PostsRepository,
		private readonly usersQueryRepository: UsersQueryRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute(command: CreatePostCommand): Promise<PostsEntity> {
		const { userId, ...postData } = command;

		const user = await this.usersQueryRepository.getUserByIdWithPosts(userId);
		if (!user) {
			throw new NotFoundException(EXCEPTION_USER_MESSAGES.USER_NOT_FOUND_404);
		}

		const post = PostsEntity.create(postData);
		await this.postsRepository.save(post);

		user.posts.push(post);
		await this.usersRepository.save(user);
		this.logger.log(`Пользователь ${userId} создал пост ${post.id}`);
		return post;
	}
}
