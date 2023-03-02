import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './api/posts.controller';
import { GetPostsByUserIdUseCase } from './api/queryRepository/getPostsByUserId.queryRepository';
import { PostsEntity } from './domain/entity/posts.entity';
import { PostsRepository } from './infrastructure/posts.repository';
import { UsersModule } from '../users/users.module';
import { GetPostsByParamsUseCase } from './api/queryRepository/getPostsByParams.queryRepository';
import { GetAllPostsUseCase } from './api/queryRepository/getAllPosts.queryRepository';

const useCases = [GetPostsByUserIdUseCase, GetPostsByParamsUseCase, GetAllPostsUseCase];

const adapters = [PostsRepository];

@Module({
	imports: [TypeOrmModule.forFeature([PostsEntity]), UsersModule],
	controllers: [PostsController],
	providers: [...useCases, ...adapters],
	exports: [],
})
export class PostsModule {}
