import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Get by Id', () => {
    let cidadeId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' })

        cidadeId = resCidade.body
    })

    it('Buscar a pessoa pelo id', async () => {
        const res = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Giovanna de Freitas',
                email: 'giovannagetbyid@hotmail.com',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const searchedRes = await testServer
            .get(`/pessoas/${res.body}`)
            .send()
            
        expect(searchedRes.statusCode).toEqual(StatusCodes.OK)
        expect(searchedRes.body).toHaveProperty('nomeCompleto')
    })
})