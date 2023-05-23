import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/base.repository.abstract';
import { PostsEntity } from '../domain/entity/posts.entity';

@Injectable()
export class PostsRepository extends BaseRepository<PostsEntity> {
	constructor(@InjectRepository(PostsEntity) private readonly postsRepoasitory: Repository<PostsEntity>) {
		super(postsRepoasitory);
	}
}
