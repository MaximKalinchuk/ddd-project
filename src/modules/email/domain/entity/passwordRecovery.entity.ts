import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IConfirmation } from '../interfaces/confirmations.interface';
import { EmailConfirmationInputModel } from './models/confirmations.input-model';

@Entity('passwordRecovery')
export class PasswordRecoveryEntity extends BaseEntity implements IConfirmation {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	userId: string;

	@Column()
	confirmationCode: string;

	@Column()
	isConfirmed: boolean;

	constructor(params: EmailConfirmationInputModel) {
		super();

		if (params) {
			this.confirmationCode = params.confirmationCode;
			this.isConfirmed = true;
		}
	}
}
