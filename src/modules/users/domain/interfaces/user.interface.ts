import { USER_ROLES } from '../../../../constants/user.role.enum';

export interface IUser {
	email: string;

	passwordHash: string;

	username: string;

	role: USER_ROLES;

	refresh_token: string | null;
}
