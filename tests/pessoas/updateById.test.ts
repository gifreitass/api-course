import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Update by Id', () => {
    let cidadeId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' })

        cidadeId = resCidade.body
    })

    it('Atualizar registro', async () => {
        const res = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Giovanna de Freitas',
                email: 'giovannaupdate@hotmail.com',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const updatedRes = await testServer
            .put(`/pessoas/${res.body}`)
            .send({
                nomeCompleto: 'Lucas Tiberio',
                email: 'lucas@hotmail.com',
                cidadeId
            })

        expect(updatedRes.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Tenta atualizar registro que não existe', async () => {
        const res = await testServer
         .put('/pessoas/9999')
         .send({
            nomeCompleto: 'Lucas Tiberio',
            email: 'lucasupdate@hotmail.com',
            cidadeId
        })

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})