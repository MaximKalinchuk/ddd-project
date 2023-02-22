import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/base.repository.abstract';
import { IConfirmationRepository } from './confirmations.repository.interface';
import { EmailConfirmationEntity } from '../domain/entity/emailConfirmation.entity';

@Injectable()
export class ConfirmationRepository extends BaseRepository<EmailConfirmationEntity> implements IConfirmationRepository {
	constructor(
		@InjectRepository(EmailConfirmationEntity)
		private readonly confirmationRepoasitory: Repository<EmailConfirmationEntity>,
	) {
		super(confirmationRepoasitory);
	}
}
