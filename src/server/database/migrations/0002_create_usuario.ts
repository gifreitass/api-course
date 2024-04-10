//0001 para informar a ordem de execução das migrations, arquivos para gerar as tabelas no banco de dados
import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

//criação da tabela
export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.usuario, table => {
            //index diz ao banco de dados que o id vai ser utilizado para consultas, com frequência, então será indexado
            table.bigIncrements('id').primary().index()
            table.string('nome').notNullable().checkLength('>', 3)
            table.string('email').index().unique().notNullable().checkLength('>', 5)
            table.string('senha').notNullable().checkLength('>', 6)
            
            table.comment('Tabela usada para armazenar usuários no sistema')
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.usuario}`)
        })
}

//vai excluir a tabela do banco
export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.usuario)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.usuario}`)
        })
}