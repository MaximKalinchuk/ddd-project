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
	Res,
	UseGuards,
} from '@nestjs/common';
import { PostsEntity } from '../domain/entity/posts.entity';
import { GetPostsByParamsCommand } from '../application/useCases/pagination.use-case';
import { CreatePostInputModel } from './models/input/createPost.input-modul';
import { CreatePostCommand } from '../application/useCases/createPost.use-case';
import { Request } from 'express';
import { UpdatePostCommand } from '../application/useCases/updatePost.use-case';
import { DeletePostCommand } from '../application/useCases/deletePost.use-case';
import { PostsQueryRepository } from '../infrastructure/posts.query.repository';
import { CommandBus } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../users/infrastructure/users.query.repository';
import { UpdatePostInputModel } from './models/input/updatePost.input-model';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminRole } from 'src/common/decorators/adminRole.decotaror';
import { USER_ROLES } from 'src/modules/users/domain/entity/users.entity';

@Controller('posts')
export class PostsController {
	private readonly logger = new Logger(PostsController.name);
	constructor(
		private readonly postsQueryRepository: PostsQueryRepository,
		private readonly commandBus: CommandBus,
		private readonly usersQueryRepository: UsersQueryRepository,
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
	@UseGuards(AdminGuard)
	@AdminRole(USER_ROLES.ADMIN)
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
	@UseGuards(AdminGuard)
	@AdminRole(USER_ROLES.ADMIN)
	async updatePost(@Param('id') id: string, @Body() postData: UpdatePostInputModel): Promise<PostsEntity> {
		return await this.commandBus.execute(new UpdatePostCommand(id, postData));
	}

	@Delete(':id')
	@UseGuards(AdminGuard)
	@AdminRole(USER_ROLES.ADMIN)
	async deletePost(@Param('id') id: string): Promise<string> {
		return await this.commandBus.execute(new DeletePostCommand(id));
	}
}
