import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration17577861381757786138610 implements MigrationInterface {
    name = 'Migration17577861381757786138610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firm_id" uuid, "first_name" character varying, "last_name" character varying, "email" character varying, "job_position" character varying, "id_web_app" character varying, "id_saas_app" character varying, "time_zone" character varying, "mfa" boolean NOT NULL DEFAULT false, "mfa_secret" character varying, "is_active" boolean NOT NULL DEFAULT false, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
