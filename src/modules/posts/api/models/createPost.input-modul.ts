import { IsOptional, IsString } from 'class-validator';

export class CreatePostInputModel {
	@IsString()
	@IsOptional()
	title: string;

	@IsString()
	@IsOptional()
	img: string;

	@IsString()
	@IsOptional()
	description: string;
}
