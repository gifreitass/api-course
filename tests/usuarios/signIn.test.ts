import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Usuários - Sign In', () => {
    beforeAll(async () => {
        await testServer
            .post('/cadastrar')
            .send({
                nome: 'Giovanna',
                email: 'gigi@hotmail.com',
                senha: 'cavalinhos'
            })
    })

    it('Fazer login', async () => {
        const login = await testServer
            .post('/entrar')
            .send({
                email: 'gigi@hotmail.com',
                senha: 'cavalinhos'
            })

        expect(login.statusCode).toEqual(StatusCodes.OK)
        expect(login.body).toHaveProperty('accessToken')
    })
    it('Fazer login sem estar cadastrado', async () => {
        const login = await testServer
            .post('/entrar')
            .send({
                email: 'lucas@hotmail.com',
                senha: 'cavalinhos'
            })

        expect(login.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(login.body).toHaveProperty('errors.default')
    })
})