import { UserRole } from '../../../../constants/UserRole';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MyBaseEntity } from '../../../base/base.entity.abstract';
import { IUser } from '../interfaces/user.interface';
import { UserInputModel } from './models/user.input-model';

@Entity({ name: 'users' })
export class UsersEntity extends MyBaseEntity {
	@Column()
	private _email: string = this.email;

	@Column()
	private _passwordHash: string = this.passwordHash;

	@Column()
	private _username: string = this.username;

	@Column({ default: null, nullable: true })
	private _refreshToken: string = this.refreshToken;

	@Column()
	private _role: UserRole = this.role;

	constructor(userParams?: UserInputModel) {
		super();

		if (userParams) {
			this.username = userParams.username ?? '';
			this.email = userParams.email ?? '';
			this.passwordHash = userParams.passwordHash ?? '';
			this.role = userParams.role ?? UserRole.USER;
			this.refreshToken = userParams.refresh_token ?? null;
		}
	}
	get passwordHash(): string {
		return this._passwordHash;
	}
	set passwordHash(hash: string) {
		this._passwordHash = hash;
	}
	get role(): UserRole {
		return this._role;
	}
	set role(role: UserRole) {
		this._role = role;
	}
	get refreshToken(): string {
		return this._refreshToken;
	}
	set refreshToken(token: string) {
		this._refreshToken = token;
	}

	get email(): string {
		return this._email;
	}
	set email(email: string) {
		this._email = email;
	}

	get username(): string {
		return this._username;
	}
	set username(username: string) {
		this._username = username;
	}
}
