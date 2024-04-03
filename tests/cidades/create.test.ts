import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {
    it('Criar registro', async () => {
        const res = await testServer
            .post('/cidades')
            .send({nome: 'São Paulo'})

        expect(res.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res.body).toEqual('number')
    });
    it('Tenta criar um registro com nome muito curto', async () => {
        const res = await testServer
            .post('/cidades')
            .send({nome: 'SP'})

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errorsResult.body.nome')
    });
})

