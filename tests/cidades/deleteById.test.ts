import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Delete by Id', () => {
    it('Deletar cidade pelo id', async () => {
        const res = await testServer
            .delete('/cidades/1')

        expect(res.statusCode).toEqual(StatusCodes.CREATED)
    })
    it('Não é permitido um número de id decimal', async () => {
        const res = await testServer
            .delete('/cidades/1.2')

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})