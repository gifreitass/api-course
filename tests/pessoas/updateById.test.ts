import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Update by Id', () => {
    let accessToken = ''
    beforeAll(async () => {
        const email = 'update-pessoas@gmail.com'
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

    it('Atualizar registro', async () => {
        const res = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Giovanna de Freitas',
                email: 'giovannaupdate@hotmail.com',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const updatedRes = await testServer
            .put(`/pessoas/${res.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
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
         .set({ Authorization: `Bearer ${accessToken}` })
         .send({
            nomeCompleto: 'Lucas Tiberio',
            email: 'lucasupdate@hotmail.com',
            cidadeId
        })

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})