import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../../users/domain/entity/users.entity';
import { IConfirmation } from '../interfaces/confirmations.interface';
import { BaseEntity } from '../../../base/base.entity.abstract';
import { randomUUID } from 'crypto';

@Entity('emailConfirmation')
export class EmailConfirmationEntity extends BaseEntity {
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

	static create(userId: string) {
		const newEmailConformation = new EmailConfirmationEntity();
		newEmailConformation.id = randomUUID();
		newEmailConformation.userId = userId;
		newEmailConformation.confirmationCode = randomUUID();
		newEmailConformation.isConfirmed = true;
		return newEmailConformation;
	}
}
