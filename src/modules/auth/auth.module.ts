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
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import { GoogleStrategy } from 'src/common/strategies/google.strategy';
import { HttpModule } from '@nestjs/axios';

const useCases = [RegistrationUseCase, LoginUseCase, RefreshUseCase, LogoutUseCase];
const adapters = [];

@Module({
	imports: [UsersModule, JwtModule.register({}), CqrsModule, EmailModule, HttpModule],
	controllers: [AuthController],
	providers: [AuthService, ...useCases, ...adapters, GoogleStrategy, GoogleAuthGuard],
	exports: [],
})
export class AuthModule {}
