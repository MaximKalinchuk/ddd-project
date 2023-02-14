import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersRepository } from './infrastructure/users.repository';
import { UsersService } from './application/users.service';
import { UsersEntity } from './domain/entity/users.entity';

const useCases = [];

const adapters = [];

@Module({
	imports: [TypeOrmModule.forFeature([UsersEntity])],
	controllers: [UsersController],
	providers: [UsersService, ...useCases, ...adapters],
	exports: [UsersService],
})
export class UsersModule {}
