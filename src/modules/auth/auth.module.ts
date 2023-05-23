import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import { LoginUseCase } from './application/useCases/login.use-case';
import { LogoutUseCase } from './application/useCases/logout.use-case';
import { RefreshUseCase } from './application/useCases/refresh.use-case';
import { RegistrationUseCase } from './application/useCases/registration.use-case';
import { CqrsModule } from '@nestjs/cqrs';

const useCases = [RegistrationUseCase, LoginUseCase, RefreshUseCase, LogoutUseCase];
const adapters = [];

@Module({
	imports: [UsersModule, JwtModule.register({}), CqrsModule, EmailModule],
	controllers: [AuthController],
	providers: [AuthService, ...useCases, ...adapters],
	exports: [],
})
export class AuthModule {}
