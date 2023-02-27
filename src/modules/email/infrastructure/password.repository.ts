import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/modules/base/base.repository.abstract';
import { Repository } from 'typeorm';
import { PasswordRecoveryEntity } from '../domain/entity/passwordRecovery.entity';
import { IPasswordRepository } from './password.repository.interface';

@Injectable()
export class PasswordRepository extends BaseRepository<PasswordRecoveryEntity> implements IPasswordRepository {
	constructor(
		@InjectRepository(PasswordRecoveryEntity)
		private readonly passwordRepository: Repository<PasswordRecoveryEntity>,
	) {
		super(passwordRepository);
	}
}
