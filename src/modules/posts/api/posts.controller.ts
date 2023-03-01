import { Controller, Get, Param } from '@nestjs/common';
import { GetAllUserPostsUseCase } from './queryRepository/getAllUserPosts.queryRepository';

@Controller('posts')
export class PostsController {
	constructor(private readonly getAllUserPostsUseCase: GetAllUserPostsUseCase) {}
	@Get(':id')
	async getAllUserPorts(@Param('id') id: string) {
		return this.getAllUserPostsUseCase.execute(id);
	}
}
