//0000 para informar a ordem de execução das migrations, arquivos para gerar as tabelas no banco de dados
import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

//criação da tabela
export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.cidade, table => {
            //index diz ao banco de dados que o id vai ser utilizado para consultas, com frequência, então será indexado
            table.bigIncrements('id').primary().index()
            //150 caracteres
            table.string('nome', 150).index().notNullable()
            table.comment('Tabela usada para armazenar cidades no sistema')
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.cidade}`)
        })
}

export async function down(knex: Knex) {
    //vai excluir a tabela do banco
    return knex.schema.dropTable(ETableNames.cidade)
    .then(() => {
        console.log(`# Dropped table ${ETableNames.cidade}`)
    })
}
