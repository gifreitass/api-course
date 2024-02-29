import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Get by Id', () => {
    it('Pegar a cidade pelo id', async () => {
        const res = await testServer
            .post('/cidades')
            .send({ nome: 'São Paulo' })

        expect(res.status).toEqual(StatusCodes.CREATED)

        const searchedRes = await testServer
            .get(`/cidades/${res.body}`)
            .send()

        expect(searchedRes.statusCode).toEqual(StatusCodes.OK)
        expect(searchedRes.body).toHaveProperty('nome')
    })
    it('Tenta buscar registro que não existe', async () => {
        const res = await testServer
            .get('/cidades/9999')
            .send()

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})