import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IConfirmation } from '../interfaces/confirmations.interface';
import { UsersEntity } from '../../../users/domain/entity/users.entity';

@Entity('emailConfirmation')
export class EmailConfirmationEntity extends BaseEntity implements IConfirmation {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	userId: string;

	@Column()
	confirmationCode: string;

	@Column()
	isConfirmed: boolean;

	@OneToOne(() => UsersEntity, (user) => user.emailConfirmation, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: UsersEntity;

	constructor(userId?: string, confirmationCode?: string) {
		super();

		if (userId) {
			this.userId = userId;
		}

		if (confirmationCode) {
			this.confirmationCode = confirmationCode;
			this.isConfirmed = false;
		}
	}
}
