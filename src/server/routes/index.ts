//permite criar uma espécie de middleware para o servidor, onde podemos especificar as nossas rotas
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (_, res) => {
	return res.send('Olá, dev!')
})

router.post('/teste', (req, res) => {
    console.log(req.body);
	return res.status(StatusCodes.ACCEPTED).json(req.body);
})

export { router }