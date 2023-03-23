import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1639029201277 implements MigrationInterface {
	name = 'Seed1639029201277';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// await queryRunner.query(
		// 	`INSERT INTO users (email, "passwordHash", username, role, refresh_token)
		//   VALUES
		//   ('maxim@mail.ru', '$2a$10$YBqQ.KiGSQDzlnIXkjccIuB9lzDmdxbc95.0PLXCPoDVxSJ/gP0sm', 'Максим', 'Admin', ''),
		//   ('alex@mail.ru', '$2a$10$hdHXZSCxoR1ZxYvxXZCufOp9HGD5oUeOgwR6NAFu9QY9AN.6FDWIW', 'Алекс', 'USER', '')`,
		// );
		// const userId = await queryRunner.query(`SELECT id FROM users WHERE username = 'Максим'`);
		// for (let i = 1; i < 25; i += 1) {
		// 	await queryRunner.query(`INSERT INTO posts (img, title, description, "usersId")
		// 			VALUES ('http://img${i}', ${i}, 'descroption-${i}', '${userId[0].id}')`);
		// }
		// for (let i = 0; i < 50; i += 1) {
		// 	await queryRunner.query(
		// 		`WITH user_data AS (
		// 			INSERT INTO users (email, "passwordHash", username, role, refresh_token) n
		// 			VALUES ($1, $2, $3, $4, NULL)
		// 			RETURNING *
		// 		),
		// 			em_conf AS (
		// 			INSERT INTO "emailConfirmation" ("userId", "confirmationCode", "isConfirmed")
		// 			VALUES ((SELECT id from user_data), '', true)
		// 			RETURNING *
		// 		),
		// 			ps_rec AS (
		// 			INSERT INTO "passwordRecovery" ("userId", "confirmationCode", "newPassword")
		// 			VALUES ((SELECT id from user_data), NULL, NULL)
		// 			RETURNING *
		// 		)
		// 		SELECT * FROM users`,
		// 		['anton@mail.ru', '$2a$10$rR5v7AAGttdivdvEdFKHOOtDG3261zu5slvQc33ylHtvxOoaPS1GG', 'Антон', 'USER'],
		// 	);
		// }
	}

	public async down(): Promise<void> {}
}
