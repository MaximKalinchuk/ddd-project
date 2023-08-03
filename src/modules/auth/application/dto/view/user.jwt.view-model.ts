import { USER_ROLES } from 'src/modules/users/domain/entity/users.entity';

export class UserJWT {
	readonly id: string;
	readonly username: string;
	readonly email: string;
	readonly role: USER_ROLES;
}
