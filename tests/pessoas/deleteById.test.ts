import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Delete', () => {
    let cidadeId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' })

        cidadeId = resCidade.body
    })

    it('Deletar registro', async () => {
        const res = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Giovanna de Freitas',
                email: 'giovannadelete@hotmail.com',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const deletedRes = await testServer
            .delete(`/pessoas/${res.body}`)
            .send()

        expect(deletedRes.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Deletar registro que não existe', async () => {
        const res = await testServer
            .delete('/pessoas/1000000')
            .send()
        
        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})