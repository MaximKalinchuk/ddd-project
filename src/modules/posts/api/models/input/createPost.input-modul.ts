import { IsOptional, IsString } from 'class-validator';

export class CreatePostInputModel {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	@IsOptional()
	img: string;
}
