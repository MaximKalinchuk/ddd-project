import { UserRole } from '../../../../../constants/UserRole';

export class UserInputModel {
	email: string;

	passwordHash: string;

	username: string;

	role: UserRole;

	refresh_token: string | null;
}
