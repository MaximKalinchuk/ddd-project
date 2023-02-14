import { UserRole } from '../../../../constants/UserRole';

export interface IUser {
	email: string;

	passwordHash: string;

	username: string;

	role: UserRole;

	refresh_token: string | null;

	getUsername(): string;

	setUsername(name: string): void;

	getEmail(): string;

	setEmail(email: string): void;

	getPasswordHash(): string;

	setPasswordHash(hash: string): void;

	getRole(): string;

	setRole(role: string): void;

	getRefreshToken(): string;

	setRefreshToken(token: string): void;
}
