// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UsersEntity } from '../domain/entity/users.entity';
// import { BaseRepository } from '../../base/base.repository.abstract';
// import { IUserRepository } from './user.repository.interface';

// @Injectable()
// export class UsersRepository extends BaseRepository<UsersEntity> implements IUserRepository {
// 	constructor(private readonly usersRepoasitory: Repository<UsersEntity>) {
// 		super(usersRepoasitory);
// 	}

// 	// async saveUser(userData: UsersEntity): Promise<UsersEntity> {
// 	// 	return await this.usersRepository.save(userData);
// 	// }
// 	// async getUserByEmail(email: string): Promise<UsersEntity> {
// 	// 	return await this.usersRepository.findOneBy({ email });
// 	// }
// }
