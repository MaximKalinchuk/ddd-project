import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInputModel {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	readonly password: string;
}
