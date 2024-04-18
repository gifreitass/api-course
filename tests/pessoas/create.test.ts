import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

//depois de testar o server com as devidas requisições vou dizer o que espero
describe('Pessoas - Create', () => {
    let accessToken = ''
    beforeAll(async () => {
        const email = 'create-pessoas@gmail.com'
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '123456'
        })
        const signInRes = await testServer.post('/entrar').send({
            email,
            senha: '123456'
        })
        accessToken = signInRes.body.accessToken
    })

    let cidadeId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Teste' })

        cidadeId = resCidade.body
    })

    it('Criar registro', async () => {
        const res = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
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
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Lucas Tiberio',
                email: 'lucasemail',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})