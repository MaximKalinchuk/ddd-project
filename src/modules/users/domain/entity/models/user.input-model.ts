import { USER_ROLES } from '../users.entity';

export class UserInputModel {
	email: string;

	password: string;

	username: string;

	role: USER_ROLES;
}
