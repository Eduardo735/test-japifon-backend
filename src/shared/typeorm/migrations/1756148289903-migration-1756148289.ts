import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration17561482891756148289903 implements MigrationInterface {
  name = 'Migration17561482891756148289903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "report_company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_primary" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP DEFAULT now(), "company_id" uuid, CONSTRAINT "PK_2d9e36314aa1e0db286088fef8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "official_name" character varying, "ticker" character varying, "exchange" character varying, "is_public" boolean NOT NULL, "is_active" boolean NOT NULL, "is_restricted" boolean NOT NULL, "sector" character varying, "industry" character varying, "description" character varying, "website" character varying, "logo" character varying, "external_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company_watchlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP DEFAULT now(), "watchlist_id" uuid, CONSTRAINT "PK_6ab70070c1c587a1f389ee06566" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "star" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "interaction_id" uuid, "is_active" boolean NOT NULL, "user_id" uuid, "firm_id" uuid, CONSTRAINT "PK_e0a31656542918b9e028c3b9f5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "firm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "website" character varying NOT NULL, "valid_domain" text array, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_b6e197d72a2ef8bd97a7cbc686e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_audit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "module" character varying NOT NULL, "who_did" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_028d1949aea3ccc867e56bd4bb4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "email" character varying NOT NULL, "email_type" character varying NOT NULL, "is_primary" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "phone" character varying NOT NULL, "country_code" character varying NOT NULL, "phone_type" character varying NOT NULL, "is_primary" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_8b544a5b4edf9ab1e479c5466f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_social_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "social_media_url" character varying NOT NULL, "social_media_type" character varying NOT NULL, "is_primary" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_3f6c194f4ce297fb7cbaff63c9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_watchlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "watchlist_id" uuid NOT NULL, "can_edit" boolean NOT NULL, "can_share" boolean NOT NULL, CONSTRAINT "PK_837432d9bfaebf5b3c7629039f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmarks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "pointsRequired" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "businessId" integer, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "location" character varying NOT NULL, "contactEmail" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "type" character varying NOT NULL DEFAULT 'earn', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "businessId" integer, "rewardId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firm_id" uuid, "first_name" character varying, "last_name" character varying, "email" character varying, "job_position" character varying, "id_web_app" character varying, "id_saas_app" character varying, "time_zone" character varying, "mfa" boolean NOT NULL DEFAULT false, "mfa_secret" character varying, "is_active" boolean NOT NULL DEFAULT false, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "profile_picture" character varying, "reward_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "watchlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_0c8c0dbcc8d379117138e71ad5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."trading_setup_direction_enum" AS ENUM('LONG', 'SHORT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "trading_setup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ticker" character varying NOT NULL, "direction" "public"."trading_setup_direction_enum" NOT NULL, "entry" double precision NOT NULL, "stopLoss" double precision NOT NULL, "breakEven" json, "targets" text, "riskManagement" json, "optionsSetup" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_543d9b9ab7a8d79b5fe9a591e93" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "user_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "report_content_id" uuid, CONSTRAINT "REL_e66289108c93bc91858c5ee3a3" UNIQUE ("report_content_id"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "report_content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "markdown" text NOT NULL DEFAULT '', CONSTRAINT "PK_560db16e1bf666acd4d4a5de887" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "google_refresh_token" character varying, CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "report_company" ADD CONSTRAINT "FK_0ea1d9999ec1e234fa87daaf5f6" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_watchlist" ADD CONSTRAINT "FK_234f61f42243b1efd164d70219a" FOREIGN KEY ("watchlist_id") REFERENCES "watchlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_watchlist" ADD CONSTRAINT "FK_ee1e2699830b9628c1fd74624d1" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "star" ADD CONSTRAINT "FK_f5d5a3f6cef1737d5ca4306b837" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "star" ADD CONSTRAINT "FK_715286e62afcc6cb321a00252a0" FOREIGN KEY ("firm_id") REFERENCES "firm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_email" ADD CONSTRAINT "FK_5fa41dccc4382ff09a32fbe6500" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phone" ADD CONSTRAINT "FK_879e6347c8b70d3698eeefee76d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_social_media" ADD CONSTRAINT "FK_e4b4a71391ce99fde3ee288495b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_watchlist" ADD CONSTRAINT "FK_7b05d31da7f8af0fadd77a18684" FOREIGN KEY ("watchlist_id") REFERENCES "watchlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_watchlist" ADD CONSTRAINT "FK_b3583672bcbbbe3e8d9db058dd9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_58a0fbaee65cd8959a870ee678c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ADD CONSTRAINT "FK_dc152b461e6327de8c149548c99" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_ebb97cc6ceb335b0d507fe147cf" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_d2b8366e4aaba58ee8d5133ffd1" FOREIGN KEY ("rewardId") REFERENCES "reward"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_142ed0e82b45cb7ca6398a11d15" FOREIGN KEY ("firm_id") REFERENCES "firm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_870b280d018d4f7520abec33561" FOREIGN KEY ("reward_id") REFERENCES "reward"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "watchlist" ADD CONSTRAINT "FK_116b3a91612f008beb96bfd5742" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" ADD CONSTRAINT "FK_e66289108c93bc91858c5ee3a39" FOREIGN KEY ("report_content_id") REFERENCES "report_content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "report" DROP CONSTRAINT "FK_e66289108c93bc91858c5ee3a39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "watchlist" DROP CONSTRAINT "FK_116b3a91612f008beb96bfd5742"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_870b280d018d4f7520abec33561"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_142ed0e82b45cb7ca6398a11d15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_d2b8366e4aaba58ee8d5133ffd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_ebb97cc6ceb335b0d507fe147cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" DROP CONSTRAINT "FK_dc152b461e6327de8c149548c99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_58a0fbaee65cd8959a870ee678c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_watchlist" DROP CONSTRAINT "FK_b3583672bcbbbe3e8d9db058dd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_watchlist" DROP CONSTRAINT "FK_7b05d31da7f8af0fadd77a18684"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_social_media" DROP CONSTRAINT "FK_e4b4a71391ce99fde3ee288495b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phone" DROP CONSTRAINT "FK_879e6347c8b70d3698eeefee76d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_email" DROP CONSTRAINT "FK_5fa41dccc4382ff09a32fbe6500"`,
    );
    await queryRunner.query(
      `ALTER TABLE "star" DROP CONSTRAINT "FK_715286e62afcc6cb321a00252a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "star" DROP CONSTRAINT "FK_f5d5a3f6cef1737d5ca4306b837"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_watchlist" DROP CONSTRAINT "FK_ee1e2699830b9628c1fd74624d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_watchlist" DROP CONSTRAINT "FK_234f61f42243b1efd164d70219a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report_company" DROP CONSTRAINT "FK_0ea1d9999ec1e234fa87daaf5f6"`,
    );
    await queryRunner.query(`DROP TABLE "doctor"`);
    await queryRunner.query(`DROP TABLE "report_content"`);
    await queryRunner.query(`DROP TABLE "report"`);
    await queryRunner.query(`DROP TABLE "trading_setup"`);
    await queryRunner.query(
      `DROP TYPE "public"."trading_setup_direction_enum"`,
    );
    await queryRunner.query(`DROP TABLE "watchlist"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "business"`);
    await queryRunner.query(`DROP TABLE "reward"`);
    await queryRunner.query(`DROP TABLE "bookmarks"`);
    await queryRunner.query(`DROP TABLE "user_watchlist"`);
    await queryRunner.query(`DROP TABLE "user_social_media"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "user_phone"`);
    await queryRunner.query(`DROP TABLE "user_email"`);
    await queryRunner.query(`DROP TABLE "user_audit"`);
    await queryRunner.query(`DROP TABLE "firm"`);
    await queryRunner.query(`DROP TABLE "star"`);
    await queryRunner.query(`DROP TABLE "company_watchlist"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "report_company"`);
  }
}
