import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import { LoginUseCase } from './application/useCases/login.use-case';
import { RefreshUseCase } from './application/useCases/refresh.use-case';
import { RegistrationUseCase } from './application/useCases/registration.use-case';

const useCases = [RegistrationUseCase, LoginUseCase, RefreshUseCase];
const adapters = [];

@Module({
	imports: [UsersModule, JwtModule.register({}), EmailModule],
	controllers: [AuthController],
	providers: [AuthService, ...useCases, ...adapters],
	exports: [],
})
export class AuthModule {}
