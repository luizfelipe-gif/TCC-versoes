/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1758520203306 {
    name = 'Db1758520203306'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`administrador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_789e78c62df228fa6e380b0009\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`agente\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`tipo_animal\` CHANGE \`nome_animal\` \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`nome_social\` \`nome_social\` varchar(70) NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`cboCodigo\` \`cboCodigo\` varchar(4) NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`agente\` CHANGE \`data_demissao\` \`data_demissao\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_b6b41cca4956bba5d7baea5247d\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_dd61fba7f45ba008dae74067718\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_dd61fba7f45ba008dae74067718\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_b6b41cca4956bba5d7baea5247d\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`agente\` CHANGE \`data_demissao\` \`data_demissao\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`cboCodigo\` \`cboCodigo\` varchar(4) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`nome_social\` \`nome_social\` varchar(70) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tipo_animal\` CHANGE \`nome_animal\` \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_789e78c62df228fa6e380b0009\` ON \`administrador\``);
        await queryRunner.query(`DROP TABLE \`administrador\``);
    }
}
