import { IBaseRepository } from 'src/modules/base/interface/base.repository.interface';
import { PostsEntity } from '../domain/entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/base/base.repository.abstract';
import { Repository } from 'typeorm';
import { GetPostsByParamsCommand } from '../api/queryRepository/getPostsByParams.queryRepository';

@Injectable()
export class PostsQueryRepository {
	constructor(@InjectRepository(PostsEntity) private readonly postsRepository: Repository<PostsEntity>) {}

	async getPostById(id: string): Promise<PostsEntity> {
		return await this.postsRepository.findOne({ where: { id } });
	}

	async getAllPosts(): Promise<PostsEntity[]> {
		return await this.postsRepository.find();
	}

	async getPostsByParams(params: { skipSize: number; PageSize: number; id: string }): Promise<PostsEntity[]> {
		const { id, skipSize, PageSize } = params;
		return await this.postsRepository.find({
			where: { user: { id } },
			order: { title: 'ASC' },
			skip: skipSize,
			take: PageSize,
		});
	}
}
