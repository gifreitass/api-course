import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Usuários - Sign Up', () => {
    it('Cadastrar usuário novo', async () => {
        const user = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Giovanna',
                email: 'gigicavalos@hotmail.com',
                senha: 'gigicavalos'
            })

        expect(user.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof user.body).toEqual('number')
    })
    it('Cadastrar usuário já existente', async () => {
        const user = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Giovanna',
                email: 'giovanna@hotmail.com',
                senha: 'gigicavalos'
            })

        expect(user.statusCode).toEqual(StatusCodes.CREATED)

        const existentUser = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Giovanna',
                email: 'giovanna@hotmail.com',
                senha: 'gigicavalos'
            })

        expect(existentUser.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    })
    it('Cadastrar usuário com senha muito pequena', async () => {
        const user = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Giovanna',
                email: 'gigicavalos@hotmail.com',
                senha: 'gi'
            })

        expect(user.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})