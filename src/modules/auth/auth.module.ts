import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import { RegistrationUseCase } from './application/useCases/registration.use-case';

const useCases = [RegistrationUseCase];
const adapters = [];

@Module({
	imports: [UsersModule],
	controllers: [AuthController],
	providers: [AuthService, ...useCases, ...adapters],
	exports: [],
})
export class AuthModule {}
