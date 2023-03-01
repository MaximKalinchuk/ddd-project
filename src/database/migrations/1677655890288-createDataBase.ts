import { MigrationInterface, QueryRunner } from "typeorm";

export class createDataBase1677655890288 implements MigrationInterface {
    name = 'createDataBase1677655890288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emailConfirmation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "confirmationCode" character varying NOT NULL, "isConfirmed" boolean NOT NULL, CONSTRAINT "REL_3cc4a4d04f9c5d58c51d5079fe" UNIQUE ("userId"), CONSTRAINT "PK_a46f72520561a423dca2534082b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passwordRecovery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "confirmationCode" character varying, "newPassword" character varying, CONSTRAINT "REL_7af3b00fa458b30ce631fd5cb3" UNIQUE ("userId"), CONSTRAINT "PK_6146c685884316d08f35e6ddc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "img" character varying, "title" character varying NOT NULL, "description" character varying NOT NULL, "usersId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL, "refresh_token" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "emailConfirmation" ADD CONSTRAINT "FK_3cc4a4d04f9c5d58c51d5079fe9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "passwordRecovery" ADD CONSTRAINT "FK_7af3b00fa458b30ce631fd5cb30" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_da1a6a4fc2bced49477262cfd41" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_da1a6a4fc2bced49477262cfd41"`);
        await queryRunner.query(`ALTER TABLE "passwordRecovery" DROP CONSTRAINT "FK_7af3b00fa458b30ce631fd5cb30"`);
        await queryRunner.query(`ALTER TABLE "emailConfirmation" DROP CONSTRAINT "FK_3cc4a4d04f9c5d58c51d5079fe9"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "passwordRecovery"`);
        await queryRunner.query(`DROP TABLE "emailConfirmation"`);
    }

}
