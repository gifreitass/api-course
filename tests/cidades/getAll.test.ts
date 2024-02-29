import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Get all', () => {
    it('Pegar dados de todas as cidades', async () => {
        const res = await testServer 
            .post('/cidades')
            .send({ nome: 'São Paulo' })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const searchedRes = await testServer
            .get('/cidades')
            .send()

        //quantidade total de registros do banco
        expect(Number(searchedRes.header['x-total-count'])).toBeGreaterThan(0)
        expect(searchedRes.statusCode).toEqual(StatusCodes.OK)
        //total de registros na página
        expect(searchedRes.body.length).toBeGreaterThan(0)
    })
})