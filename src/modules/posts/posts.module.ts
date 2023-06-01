import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './api/posts.controller';
import { PostsEntity } from './domain/entity/posts.entity';
import { PostsRepository } from './infrastructure/posts.repository';
import { UsersModule } from '../users/users.module';
import { GetPostsByParamsUseCase } from './application/useCases/pagination.use-case';
import { CreatePostUseCase } from './application/useCases/createPost.use-case';
import { UpdatePostUseCase } from './application/useCases/updatePost.use-case';
import { DeletePostUseCase } from './application/useCases/deletePost.use-case';
import { PostsQueryRepository } from './infrastructure/posts.query.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { MinioService } from './application/minio.service';

const useCases = [GetPostsByParamsUseCase, CreatePostUseCase, UpdatePostUseCase, DeletePostUseCase];

const adapters = [PostsRepository, PostsQueryRepository];

@Module({
	imports: [TypeOrmModule.forFeature([PostsEntity]), CqrsModule, UsersModule],
	controllers: [PostsController],
	providers: [...useCases, ...adapters, MinioService],
	exports: [],
})
export class PostsModule {}
