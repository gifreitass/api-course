import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Update by Id', () => {
    let accessToken = ''
    beforeAll(async () => {
        const email = 'update-cidades@gmail.com'
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
    it('Atualizar uma cidade', async () => {
        const res = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Rio de Janeiro' })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const updatedRes = await testServer
            .put(`/cidades/${res.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Santos' })

        expect(updatedRes.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Tenta atualizar registro que não existe', async () => {
        const res = await testServer
         .put('/cidades/9999')
         .set({ Authorization: `Bearer ${accessToken}` })
         .send({ nome: 'Caxias' })

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})