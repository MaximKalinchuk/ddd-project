import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { PostsEntity } from '../../domain/entity/posts.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostsQueryRepository } from '../../infrastructure/posts.query.repository';

export class GetPostsByParamsCommand {
	public PageSize: number;
	public PageNumber: number;
	public id: string;

	constructor(params: { PageSize: number; PageNumber: number; id: string }) {
		this.PageNumber = params.PageNumber;
		this.PageSize = params.PageSize;
		this.id = params.id;
	}
}

@CommandHandler(GetPostsByParamsCommand)
export class GetPostsByParamsUseCase implements ICommandHandler<GetPostsByParamsCommand> {
	constructor(private readonly postsQueryRepository: PostsQueryRepository) {}
	async execute(commad: GetPostsByParamsCommand) {
		const { PageSize, PageNumber, id } = commad;
		const skipSize = (PageNumber - 1) * PageSize;
		console.log(skipSize);

		// return await PostsEntity.find({ order: { title: 'DESC' }, skip: skipSize, where: { users: { id } } });
		return await this.postsQueryRepository.getPostsByParams({ PageSize, skipSize, id });
	}
}
