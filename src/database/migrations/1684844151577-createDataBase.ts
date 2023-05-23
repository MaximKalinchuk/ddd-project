import { MigrationInterface, QueryRunner } from "typeorm";

export class createDataBase1684844151577 implements MigrationInterface {
    name = 'createDataBase1684844151577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emailConfirmation" ("id" uuid NOT NULL, "created_At" TIMESTAMP DEFAULT now(), "updated_At" TIMESTAMP DEFAULT now(), "deleted_At" TIMESTAMP, "userId" uuid NOT NULL, "confirmationCode" character varying NOT NULL, "isConfirmed" boolean NOT NULL, CONSTRAINT "REL_3cc4a4d04f9c5d58c51d5079fe" UNIQUE ("userId"), CONSTRAINT "PK_a46f72520561a423dca2534082b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passwordRecovery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "confirmationCode" character varying, "newPassword" character varying, CONSTRAINT "REL_7af3b00fa458b30ce631fd5cb3" UNIQUE ("userId"), CONSTRAINT "PK_6146c685884316d08f35e6ddc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL, "created_At" TIMESTAMP DEFAULT now(), "updated_At" TIMESTAMP DEFAULT now(), "deleted_At" TIMESTAMP, "userId" uuid NOT NULL, "img" character varying, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "antiSpamFeedbackTime" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "createdAt" TIMESTAMP, CONSTRAINT "REL_87c0a9d87bfc5e2ab5e517ea5f" UNIQUE ("userId"), CONSTRAINT "PK_287aff9489fa9fabd66481c8ee6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "created_At" TIMESTAMP DEFAULT now(), "updated_At" TIMESTAMP DEFAULT now(), "deleted_At" TIMESTAMP, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL, "refresh_token" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "emailConfirmation" ADD CONSTRAINT "FK_3cc4a4d04f9c5d58c51d5079fe9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "passwordRecovery" ADD CONSTRAINT "FK_7af3b00fa458b30ce631fd5cb30" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "antiSpamFeedbackTime" ADD CONSTRAINT "FK_87c0a9d87bfc5e2ab5e517ea5f8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "antiSpamFeedbackTime" DROP CONSTRAINT "FK_87c0a9d87bfc5e2ab5e517ea5f8"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "passwordRecovery" DROP CONSTRAINT "FK_7af3b00fa458b30ce631fd5cb30"`);
        await queryRunner.query(`ALTER TABLE "emailConfirmation" DROP CONSTRAINT "FK_3cc4a4d04f9c5d58c51d5079fe9"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "antiSpamFeedbackTime"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "passwordRecovery"`);
        await queryRunner.query(`DROP TABLE "emailConfirmation"`);
    }

}
