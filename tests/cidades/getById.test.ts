import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Get by Id', () => {
    let accessToken = ''
    beforeAll(async () => {
        const email = 'getbyid-cidades@gmail.com'
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
    it('Pegar a cidade pelo id', async () => {
        const res = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'São Paulo' })

        expect(res.status).toEqual(StatusCodes.CREATED)

        const searchedRes = await testServer
            .get(`/cidades/${res.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(searchedRes.statusCode).toEqual(StatusCodes.OK)
        expect(searchedRes.body).toHaveProperty('nome')
    })
    it('Tenta buscar registro que não existe', async () => {
        const res = await testServer
            .get('/cidades/9999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})