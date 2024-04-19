import { Knex } from "knex"
import path from 'path'

export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        //onde o arquivo será criado
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    //seed: função para popular a api com dados depois das migrations serem rodadas
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    //ex: se tiver uma pessoa vinculada com cidade e tentar apagar essa cidade, não vai dar certo por conta do vínculo
    pool: {
        afterCreate: (connection: any, done: Function) => {
            //roda uma espécie de comando sql para ativar chaves estrangeiras no sqlite
            connection.run('PRAGMA foreign_keys = ON')
            done()
        }
    }
}

export const test: Knex.Config = {
    ...development,
    connection: ':memory:'
}

export const production: Knex.Config = {
    client: 'pg',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT || 5432),
        ssl: { rejectUnauthorized: false }
    }
}
