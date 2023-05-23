import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../domain/entity/users.entity';
import { BaseRepository } from '../../base/base.repository.abstract';

@Injectable()
export class UsersRepository extends BaseRepository<UsersEntity> {
	constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {
		super(usersRepository);
	}
}
