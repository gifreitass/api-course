import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Get all', () => {
    it('Pegar dados de todas as cidades', async () => {
        const res = await testServer
            .get('/cidades')
        expect(res.status).toEqual(StatusCodes.CREATED)
    })
})