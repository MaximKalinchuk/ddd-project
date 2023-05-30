import { USER_ROLES } from '../entity/users.entity';

export interface IUser {
	email: string;

	passwordHash: string;

	username: string;

	role: USER_ROLES;

	refresh_token: string | null;
}
