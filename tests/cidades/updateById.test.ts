import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Update by Id', () => {
    it('Atualizar uma cidade', async () => {
        const res = await testServer
            .post('/cidades')
            .send({ nome: 'Rio de Janeiro' })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)

        const updatedRes = await testServer
            .put(`/cidades/${res.body}`)
            .send({ nome: 'Santos' })

        expect(updatedRes.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Tenta atualizar registro que não existe', async () => {
        const res = await testServer
         .put('/cidades/9999')
         .send({ nome: 'Caxias' })

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body).toHaveProperty('errors.default')
    })
})