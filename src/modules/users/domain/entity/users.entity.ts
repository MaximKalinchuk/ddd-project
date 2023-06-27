import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity.abstract';
import { IUser } from '../interfaces/user.interface';
import { UserInputModel } from './models/user.input-model';
import { EmailConfirmationEntity } from 'src/modules/email/domain/entity/emailConfirmation.entity';
import { EmailConfirmationInputModel } from 'src/modules/email/domain/entity/models/confirmations.input-model';
import { PasswordRecoveryEntity } from 'src/modules/email/domain/entity/passwordRecovery.entity';
import { PostsEntity } from '../../../posts/domain/entity/posts.entity';
import { AntiSpamFeedbackTime } from '../../../email/domain/entity/antiSpamFeedbackTime.entity';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

export enum USER_ROLES {
	USER = 'Пользователь',
	ADMIN = 'Администратор',
}

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
	@Column()
	email: string;

	@Column()
	passwordHash: string;

	@Column()
	username: string;

	@Column()
	role: USER_ROLES;

	@Column({ default: null, nullable: true })
	refresh_token: string | null;

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.passwordHash = await hash(this.passwordHash, 10);
	}

	@OneToOne(() => EmailConfirmationEntity, (emailConfirmation) => emailConfirmation.user, {
		cascade: true,
	})
	emailConfirmation: EmailConfirmationEntity;

	@OneToOne(() => PasswordRecoveryEntity, (passwordRecovery) => passwordRecovery.user, {
		cascade: true,
	})
	passwordRecovery: PasswordRecoveryEntity;

	@OneToMany(() => PostsEntity, (posts) => posts.user, {
		cascade: true,
	})
	posts: PostsEntity[];

	@OneToOne(() => AntiSpamFeedbackTime, (feedbackTime) => feedbackTime.user, {
		cascade: true,
	})
	feedbackTime: AntiSpamFeedbackTime;

	static create(userParams: UserInputModel) {
		const newUser = new UsersEntity();
		newUser.id = randomUUID();
		newUser.email = userParams.email;
		newUser.username = userParams.username;
		newUser.role = userParams.role;
		newUser.refresh_token = null;
		newUser.passwordHash = userParams.password;
		return newUser;
	}

	setRefreshToken(tokenHash: string) {
		this.refresh_token = tokenHash;
	}
}
