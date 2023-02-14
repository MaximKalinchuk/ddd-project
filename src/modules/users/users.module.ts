import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/users.service';
import { UsersEntity } from './domain/entity/users.entity';

import { UsersRepository } from './infrastructure/users.repository';
import { CreateUsersUseCase } from './application/useCases/CreateUser.use-case';
import { UsersController } from './api/users.controller';

const useCases = [CreateUsersUseCase];

const adapters = [UsersRepository];

@Module({
	imports: [TypeOrmModule.forFeature([UsersEntity])],
	controllers: [UsersController],
	providers: [UsersService, ...useCases, ...adapters],
	exports: [CreateUsersUseCase],
})
export class UsersModule {}
