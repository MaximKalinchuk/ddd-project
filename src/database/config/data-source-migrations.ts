import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { UsersEntity } from '../../modules/users/domain/entity/users.entity';
import { EmailConfirmationEntity } from 'src/modules/email/domain/entity/emailConfirmation.entity';
import { PasswordRecoveryEntity } from 'src/modules/email/domain/entity/passwordRecovery.entity';
import { PostsEntity } from 'src/modules/posts/domain/entity/posts.entity';
import { createDataBase1677761622924 } from '../migrations/1677761622924-createDataBase';

dotenv.config({
	path: `.${process.env.NODE_ENV}.env`,
});

const config: DataSourceOptions = {
	type: 'postgres',
	host: process.env.PG_HOST,
	port: +process.env.PG_PORT,
	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	entities: [UsersEntity, EmailConfirmationEntity, PasswordRecoveryEntity, PostsEntity],
	migrations: [createDataBase1677761622924],
	synchronize: false,
};

export const AppDataSource: DataSource = new DataSource(config);
