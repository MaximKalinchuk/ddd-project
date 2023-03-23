import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EmailConfirmationEntity } from 'src/modules/email/domain/entity/emailConfirmation.entity';
import { UsersEntity } from '../modules/users/domain/entity/users.entity';
import { PasswordRecoveryEntity } from '../modules/email/domain/entity/passwordRecovery.entity';
import { join } from 'path';
import { PostsEntity } from 'src/modules/posts/domain/entity/posts.entity';
import { AntiSpamFeedbackTime } from 'src/modules/email/domain/entity/antiSpamFeedbackTime.entity';

export const TypeOrmConfigService = (): TypeOrmModuleAsyncOptions => ({
	useFactory: (configService: ConfigService) => ({
		type: 'postgres',
		host: configService.get('PG_HOST'),
		port: +configService.get('PG_PORT'),
		username: configService.get('PG_USERNAME'),
		password: configService.get('PG_PASSWORD'),
		database: configService.get('PG_DATABASE'),
		entities: [UsersEntity, EmailConfirmationEntity, PostsEntity, PasswordRecoveryEntity, AntiSpamFeedbackTime],
		synchronize: false,
		migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
		// cli: {
		//     migrationsDir: 'src/migrations'
		// }
	}),
	inject: [ConfigService],
	imports: [],
});
