import { UsersEntity } from 'src/modules/users/domain/entity/users.entity';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPassword } from '../interfaces/password.interface';

@Entity('passwordRecovery')
export class PasswordRecoveryEntity extends BaseEntity implements IPassword {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	userId: string;

	@Column({ nullable: true })
	confirmationCode: string;

	@Column({ nullable: true })
	newPassword: string;

	@OneToOne(() => UsersEntity, (user) => user.passwordRecovery, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: UsersEntity;

	constructor(userId?: string, confirmationCode?: string, newPassword?: string) {
		super();

		if (userId) {
			this.userId = userId;
		}

		if (confirmationCode) {
			this.confirmationCode = confirmationCode;
			this.newPassword = newPassword;
		}
	}
}
