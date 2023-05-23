import { USER_ROLES } from '../../../../../constants/user.role.enum';

export class UserInputModel {
	email: string;

	password: string;

	username: string;

	role: USER_ROLES;
}
