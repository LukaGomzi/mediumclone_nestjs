import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1720536763678 implements MigrationInterface {
    name = 'SeedDb1720536763678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`
        );
        await queryRunner.query(
            // Password is 123
            `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$lFXT5.Lq8bonfzB9J2ged.lfdWqJnTCgWfbg2noTvoSknqHgAtJpa')`
        );
        await queryRunner.query(
            `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES 
            ('first-article', 'First article', 'First article description', 'First article body', 'coffee,dragons', 1),
            ('second-article', 'Second article', 'Second article description', 'Second article body', 'coffee,dragons', 1)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
