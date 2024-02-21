//permite criar uma espécie de middleware para o servidor, onde podemos especificar as nossas rotas
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesController } from './../controllers'

const router = Router()

router.get('/', (_, res) => {
	return res.send('Olá, dev!')
})

router.post('/cidades', CidadesController.create)

export { router }