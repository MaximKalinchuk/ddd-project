import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '../../../base/base.entity.abstract';
import { IConfirmation } from '../interfaces/confirmations.interface';
import { ConfirmationInputModel } from './models/confirmations.input-model';

@Entity('confirmations')
export class ConfirmationEntity extends MyBaseEntity implements IConfirmation {
	@Column()
	userId: number;

	@Column()
	confirmationCode: string;

	@Column()
	isConfirmed: boolean;

	constructor(params: ConfirmationInputModel) {
		super();

		if (params) {
			this.confirmationCode = params.confirmationCode;
			this.isConfirmed = params.isConfirmed ?? false;
			this.userId = params.userId;
		}
	}
}
