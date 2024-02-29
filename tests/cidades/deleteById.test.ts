import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Delete by Id', () => {
    it('Deletar cidade pelo id', async () => {
        //estaremos trabalhando com um banco zerado, por isso precisa criar o registro antes
        const res = await testServer
            .post('/cidades')
            .send({ nome: 'Caxias do Sul' })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const deletedRes = await testServer
            .delete(`/cidades/${res.body}`)
            .send()

        expect(deletedRes.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Tenta apagar registro que não existe', async () => {
        const res = await testServer
            .delete('/cidades/9999')
            .send()

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
    it('Não é permitido um número de id decimal', async () => {
        const res = await testServer
            .delete('/cidades/1.2')

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})