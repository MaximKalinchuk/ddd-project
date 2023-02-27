import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PasswordRecovery {
	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
