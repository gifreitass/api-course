import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Delete', () => {
    let accessToken = ''
    beforeAll(async () => {
        const email = 'delete-pessoas@gmail.com'
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

    it('Deletar registro', async () => {
        const res = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Giovanna de Freitas',
                email: 'giovannadelete@hotmail.com',
                cidadeId
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const deletedRes = await testServer
            .delete(`/pessoas/${res.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(deletedRes.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Deletar registro que não existe', async () => {
        const res = await testServer
            .delete('/pessoas/1000000')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()
        
        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})