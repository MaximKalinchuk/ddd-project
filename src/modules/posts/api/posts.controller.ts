import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
	UnauthorizedException,
	Logger,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { PostsEntity } from '../domain/entity/posts.entity';
import { GetPostsByParamsCommand } from '../application/useCases/pagination.use-case';
import { CreatePostInputModel } from './models/input/createPost.input-modul';
import { CreatePostCommand } from '../application/useCases/createPost.use-case';
import { Request } from 'express';
import { UpdatePostCommand, UpdatePostUseCase } from '../application/useCases/updatePost.use-case';
import { DeletePostCommand } from '../application/useCases/deletePost.use-case';
import { PostsQueryRepository } from '../infrastructure/posts.query.repository';
import { CommandBus } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users/infrastructure/users.query.repository';
import { UpdatePostInputModel } from './models/input/updatePost.input-model';
import { MinioService } from '../application/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
	private readonly logger = new Logger(PostsController.name);
	constructor(
		private readonly postsQueryRepository: PostsQueryRepository,
		private readonly commandBus: CommandBus,
		private readonly usersQueryRepository: UsersQueryRepository,
		private readonly minioService: MinioService,
	) {}

	@Get()
	async getAllPosts() {
		return await this.postsQueryRepository.getAllPosts();
	}

	@Get('findByParams')
	async getPostsByParams(@Query() params) {
		console.log(params);
		return await this.commandBus.execute(new GetPostsByParamsCommand(params));
	}

	@Get('user/:id')
	async getAllUserPosts(@Param('id') id: string): Promise<PostsEntity[]> {
		return await this.usersQueryRepository.getPostsUserById(id);
	}

	@Get(':id')
	async getPostById(@Param('id') id: string): Promise<PostsEntity> {
		return await this.postsQueryRepository.getPostById(id);
	}

	@Post()
	async createPost(@Body() postData: CreatePostInputModel, @Req() req: Request): Promise<PostsEntity> {
		const user = req.user;
		if ('id' in user) {
			if (typeof user.id === 'string') {
				return await this.commandBus.execute(new CreatePostCommand(user.id, postData));
			}
		}
		throw new UnauthorizedException();
	}

	@Put(':id')
	async updatePost(@Param('id') id: string, @Body() postData: UpdatePostInputModel): Promise<PostsEntity> {
		return await this.commandBus.execute(new UpdatePostCommand(id, postData));
	}

	@Delete(':id')
	async deletePost(@Param('id') id: string): Promise<string> {
		return await this.commandBus.execute(new DeletePostCommand(id));
	}

	@Post('covers')
	@UseInterceptors(FileInterceptor('file'))
	async uploadBookCover(@UploadedFile() file: Express.Multer.File) {
		console.log(file);
		await this.minioService.createBucketIfNotExists();
		const fileName = await this.minioService.uploadFile(file);
		return fileName;
	}

	@Get('covers/:fileName')
	async getBookCover(@Param('fileName') fileName: string) {
		const fileUrl = await this.minioService.getFileUrl(fileName);
		return fileUrl;
	}

	@Delete('covers/:fileName')
	async deleteBookCover(@Param('fileName') fileName: string) {
		await this.minioService.deleteFile(fileName);
		return fileName;
	}
}
