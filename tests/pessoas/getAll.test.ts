import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

//describe com nome do teste, função com testes iniciando com it, cada teste tem um nome e uma função assincrona,
describe('Pessoas - Get all', () => {
    let accessToken = ''
    beforeAll(async () => {
        const email = 'getall-pessoas@gmail.com'
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
    //precisamos do cidadeId para criar uma pessoa, então para garantir que a cidade existe criamos abaixo
    let cidadeId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Teste' })

        cidadeId = resCidade.body
    })

    it('Busca registros', async () => {
        const res = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Giovanna de Freitas',
                email: 'giovannagetall@hotmail.com',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const searchedRes = await testServer
            .get('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(searchedRes.statusCode).toEqual(StatusCodes.OK)
        expect(Number(searchedRes.header['x-total-count'])).toBeGreaterThan(0)
        expect(searchedRes.body.length).toBeGreaterThan(0)
    })
})