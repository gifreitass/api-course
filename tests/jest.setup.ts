import supertest from "supertest";
import { server } from "../src/server/server";
import { Knex } from "../src/server/database/knex";

beforeAll(async () => {
    //antes de executar todos os teste o knex precisa migrar as tabelas
    await Knex.migrate.latest()
    await Knex.seed.run()
})

afterAll(async () => {
    //desconecta no knex
    await Knex.destroy()
})

export const testServer = supertest(server)