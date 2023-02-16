import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/base.repository.abstract';
import { IConfirmationRepository } from './confirmations.repository.interface';
import { ConfirmationEntity } from '../domain/entity/confirmations.entity';

@Injectable()
export class ConfirmationRepository extends BaseRepository<ConfirmationEntity> implements IConfirmationRepository {
	constructor(
		@InjectRepository(ConfirmationEntity) private readonly confirmationRepoasitory: Repository<ConfirmationEntity>,
	) {
		super(confirmationRepoasitory);
	}
}
