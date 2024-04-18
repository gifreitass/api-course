import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Get all', () => {
    let accessToken = ''
    beforeAll(async () => {
        const email = 'getall-cidades@gmail.com'
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
    it('Pegar dados de todas as cidades', async () => {
        const res = await testServer 
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'São Paulo' })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const searchedRes = await testServer
            .get('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        //quantidade total de registros do banco
        expect(Number(searchedRes.header['x-total-count'])).toBeGreaterThan(0)
        expect(searchedRes.statusCode).toEqual(StatusCodes.OK)
        //total de registros na página
        expect(searchedRes.body.length).toBeGreaterThan(0)
    })
})