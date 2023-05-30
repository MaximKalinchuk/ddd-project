import { HttpException, HttpStatus, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { PostsQueryRepository } from '../../infrastructure/posts.query.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EXCEPTION_POST_MESSAGES } from '@lib/constants/exception.messages.enum';

export class DeletePostCommand {
	constructor(public id: string) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostUseCase implements ICommandHandler<DeletePostCommand> {
	constructor(
		private readonly postsQueryRepository: PostsQueryRepository,
		private readonly postsRepository: PostsRepository,
	) {}

	async execute(command: DeletePostCommand) {
		const { id } = command;
		const post = await this.postsQueryRepository.getPostById(id);
		if (!post) {
			throw new NotFoundException(EXCEPTION_POST_MESSAGES.POST_NOT_FOUND_404);
		}
		await this.postsRepository.softDelete(id);
		return 'Пост удалён';
	}
}
