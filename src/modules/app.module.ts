import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync(TypeOrmConfigService()),
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
