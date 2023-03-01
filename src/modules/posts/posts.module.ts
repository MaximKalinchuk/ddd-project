import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './api/posts.controller';
import { GetAllUserPostsUseCase } from './api/queryRepository/getAllUserPosts.queryRepository';
import { PostsEntity } from './domain/entity/posts.entity';
import { PostsRepository } from './infrastructure/posts.repository';
import { UsersModule } from '../users/users.module';

const useCases = [GetAllUserPostsUseCase];

const adapters = [PostsRepository];

@Module({
	imports: [TypeOrmModule.forFeature([PostsEntity]), UsersModule],
	controllers: [PostsController],
	providers: [...useCases, ...adapters],
	exports: [],
})
export class PostsModule {}
