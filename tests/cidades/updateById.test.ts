import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Update by Id', () => {
    it('Atualizar uma cidade', async () => {
        const res = await testServer
            .put('/cidades/1')
            .send({ nome: 'Rio de Janeiro' })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)
    })
})