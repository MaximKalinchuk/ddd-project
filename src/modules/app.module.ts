import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessGuard } from 'src/common/guards/jwt.access.guard';
import { AtStrategy } from 'src/common/strategies/jwt.access.strategy';
import { RtStrategy } from 'src/common/strategies/jwt.refresh.strategy';
import { TypeOrmConfigService } from '../config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CloudModule } from './cloud/cloud.module';
import { GoogleStrategy } from 'src/common/strategies/google.strategy';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';

@Module({
	imports: [
		TypeOrmModule.forRootAsync(TypeOrmConfigService()),
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
		EmailModule,
		PostsModule,
		CloudModule,
	],
	controllers: [],
	providers: [
		AtStrategy,
		RtStrategy,
		{
			provide: 'APP_GUARD',
			useClass: JwtAccessGuard,
		},
	],
})
export class AppModule {}
