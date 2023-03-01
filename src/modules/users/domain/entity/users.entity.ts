import { UserRole } from '../../../../constants/UserRole';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MyBaseEntity } from '../../../base/base.entity.abstract';
import { IUser } from '../interfaces/user.interface';
import { UserInputModel } from './models/user.input-model';
import { EmailConfirmationEntity } from 'src/modules/email/domain/entity/emailConfirmation.entity';
import { EmailConfirmationInputModel } from 'src/modules/email/domain/entity/models/confirmations.input-model';
import { v4 as uuidv4 } from 'uuid';
import { PasswordRecoveryEntity } from 'src/modules/email/domain/entity/passwordRecovery.entity';
import { PostsEntity } from '../../../posts/domain/entity/posts.entity';

@Entity({ name: 'users' })
export class UsersEntity extends MyBaseEntity implements IUser {
	@Column()
	email: string;

	@Column()
	passwordHash: string;

	@Column()
	username: string;

	@Column()
	role: UserRole;

	@Column({ default: null, nullable: true })
	refresh_token: string | null;

	@OneToOne(() => EmailConfirmationEntity, (emailConfirmation) => emailConfirmation.user, {
		cascade: true,
	})
	emailConfirmation: EmailConfirmationEntity;

	@OneToOne(() => PasswordRecoveryEntity, (passwordRecovery) => passwordRecovery.user, {
		cascade: true,
	})
	passwordRecovery: PasswordRecoveryEntity;

	@OneToMany(() => PostsEntity, (posts) => posts.users, {
		cascade: true,
	})
	posts: PostsEntity;

	constructor(userParams?: UserInputModel, emailParams?: EmailConfirmationInputModel) {
		super();

		if (userParams && emailParams) {
			this.username = userParams.username;
			this.email = userParams.email ?? '';
			this.passwordHash = userParams.passwordHash ?? '';
			this.role = userParams.role ?? UserRole.USER;
			this.refresh_token = userParams.refresh_token ?? null;
			this.emailConfirmation = new EmailConfirmationEntity(this.id, emailParams.confirmationCode);
			this.passwordRecovery = new PasswordRecoveryEntity(this.id);
		}
	}

	getEmailConfirmationCode() {
		return this.emailConfirmation.confirmationCode;
	}

	getPasswordHash(): string {
		return this.passwordHash;
	}
	setPasswordHash(hash: string): void {
		this.passwordHash = hash;
	}
	getRole(): string {
		return this.role;
	}
	setRole(role: UserRole): void {
		this.role = role;
	}
	getRefreshToken(): string {
		return this.refresh_token;
	}
	setRefreshToken(token: string): void {
		this.refresh_token = token;
	}

	getEmail(): string {
		return this.email;
	}
	setEmail(email: string): void {
		this.email = email;
	}

	getUsername(): string {
		return this.username;
	}
	setUsername(username: string): void {
		this.username = username;
	}
}
