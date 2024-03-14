//0001 para informar a ordem de execução das migrations, arquivos para gerar as tabelas no banco de dados
import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

//criação da tabela
export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => {
            //index diz ao banco de dados que o id vai ser utilizado para consultas, com frequência, então será indexado
            table.bigIncrements('id').primary().index()
            table.string('nomeCompleto').index().notNullable()
            table.string('email').unique().notNullable()
            //faz referência a um id da tabela de cidades 
            table
                .bigInteger('cidadeId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.cidade)
                //se a cidade referenciada acabar substituindo o id dela por outro o próprio sql vai fazer essa substituição na tabela de pessoas
                .onUpdate('CASCADE')
                //se tentar apagar uma cidade vinculada a pessoa, não vai dar pra apagar pois está nesse modo
                .onDelete('RESTRICT')
            table.comment('Tabela usada para armazenar pessoas no sistema')
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.pessoa}`)
        })
}

//vai excluir a tabela do banco
export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pessoa)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pessoa}`)
        })
}
