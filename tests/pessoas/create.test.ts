import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

//depois de testar o server com as devidas requisições vou dizer o que espero
describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' })

        cidadeId = resCidade.body
    })

    it('Criar registro', async () => {
        const res = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Giovanna de Freitas',
                email: 'giovanna@hotmail.com',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res.body).toEqual('number')
    })
    it('Criar registro com e-mail incorreto', async () => {
        const res = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Lucas Tiberio',
                email: 'lucasemail',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errors.body.email')
    })
})