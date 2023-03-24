import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './api/posts.controller';
import { GetPostsByUserIdUseCase } from './api/queryRepository/getPostsByUserId.queryRepository';
import { PostsEntity } from './domain/entity/posts.entity';
import { PostsRepository } from './infrastructure/posts.repository';
import { UsersModule } from '../users/users.module';
import { GetPostsByParamsUseCase } from './api/queryRepository/getPostsByParams.queryRepository';
import { GetAllPostsUseCase } from './api/queryRepository/getAllPosts.queryRepository';
import { GetPostByIdUseCase } from './api/queryRepository/getPostById.queryRepository';
import { CreatePostUseCase } from './application/useCases/createPost.use-case';
import { UpdatePostUseCase } from './application/useCases/updatePost.use-case';
import { DeletePostUseCase } from './application/useCases/deletePost.use-case';

const useCases = [
	GetPostsByUserIdUseCase,
	GetPostsByParamsUseCase,
	GetAllPostsUseCase,
	GetPostByIdUseCase,
	CreatePostUseCase,
	UpdatePostUseCase,
	DeletePostUseCase,
];

const adapters = [PostsRepository];

@Module({
	imports: [TypeOrmModule.forFeature([PostsEntity]), UsersModule],
	controllers: [PostsController],
	providers: [...useCases, ...adapters],
	exports: [],
})
export class PostsModule {}
