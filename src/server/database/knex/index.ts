import knex from "knex";
import pg from 'pg'
//a importação abaixo faz com que as váriaveis de ambiente sejam inicializadas nesse arquivo
import 'dotenv/config'
import { development, production, test } from "./Environment"; 

//configuração para o postgres rodar 100% com knex
if (process.env.NODE_ENV === 'production') {
    //tratamento de dados
    pg.types.setTypeParser(20, 'text', parseInt)
}

const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return production;
        case 'test': 
            return test
        default:
            return development;
    }
}

export const Knex = knex(getEnviroment())