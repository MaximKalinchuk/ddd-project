import { UserRole } from '../../../constants/UserRole';
import { UserInputModel } from './entity/models/user.input-model';
import { UsersEntity } from './entity/users.entity';

describe('test', () => {
	const userParams: UserInputModel = {
		email: 'alex@main.ru',

		passwordHash: 'a12dsadf12',

		username: 'Alex',

		role: UserRole.USER,

		refresh_token: '1234',
	};

	it('should return', async () => {
		const newUser = new UsersEntity(userParams);
		expect(newUser.getUsername()).toBe(userParams.username);
	});
});
