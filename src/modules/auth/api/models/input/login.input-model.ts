import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsPasswordMatchingConstraint } from 'src/common/decorators/is-password-matching-constraint.decorator';

export class LoginInputModel {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	readonly password: string;

	@IsString()
	@IsNotEmpty()
	@Validate(IsPasswordMatchingConstraint)
	readonly passwordRepeat: string;
}
