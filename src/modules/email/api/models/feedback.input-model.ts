import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FeedbackInputModel {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	readonly message: string;

	@IsString()
	@IsNotEmpty()
	readonly subject: string;
}
