/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1762741397947 {
    name = 'Db1762741397947'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` CHANGE \`registro_visita\` \`registro_excluido\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP COLUMN \`registro_excluido\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD \`registro_excluido\` datetime NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP COLUMN \`registro_excluido\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD \`registro_excluido\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` CHANGE \`registro_excluido\` \`registro_visita\` text NOT NULL`);
    }
}
