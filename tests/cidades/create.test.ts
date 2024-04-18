import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {
    //accessToken precisa ficar disponível para os outros testes
    let accessToken = ''
    //função para cadastrar usuário e fazer login
    beforeAll(async () => {
        const email = 'create-cidades@gmail.com'
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
    it('Tenta criar um registro sem token de acesso', async () => {
        const res = await testServer
            .post('/cidades')
            .send({ nome: 'São Paulo' })

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res.body).toHaveProperty('errors.default')
    });
    it('Criar registro', async () => {
        const res = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'São Paulo' })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res.body).toEqual('number')
    });
    it('Tenta criar um registro com nome muito curto', async () => {
        const res = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'SP' })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errorsResult.body.nome')
    });
})

