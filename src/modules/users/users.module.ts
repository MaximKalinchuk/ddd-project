import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/users.service';
import { UsersEntity } from './domain/entity/users.entity';
import { UsersRepository } from './infrastructure/users.repository';
import { CreateUsersUseCase } from './application/useCases/create.user.use-case';
import { UsersController } from './api/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersQueryRepository } from './infrastructure/users.query.repository';

const useCases = [CreateUsersUseCase];

const adapters = [UsersRepository, UsersQueryRepository];

@Module({
	imports: [TypeOrmModule.forFeature([UsersEntity]), CqrsModule],
	controllers: [UsersController],
	providers: [UsersService, ...useCases, ...adapters],
	exports: [CreateUsersUseCase, UsersRepository, UsersQueryRepository, UsersService],
})
export class UsersModule {}
