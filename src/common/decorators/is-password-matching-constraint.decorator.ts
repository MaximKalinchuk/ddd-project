import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { LoginInputModel } from 'src/modules/auth/api/models/input/login.input-model';

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
	validate(passwordRepeat: string, args: ValidationArguments): boolean | Promise<boolean> {
		const obj = args.object as LoginInputModel;
		return obj.password === passwordRepeat;
	}
	defaultMessage?(validationArguments?: ValidationArguments): string {
		return 'Пароли не совпадают';
	}
}
