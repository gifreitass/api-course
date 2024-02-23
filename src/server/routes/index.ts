//permite criar uma espécie de middleware para o servidor, onde podemos especificar as nossas rotas
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesController } from './../controllers'

const router = Router()

router.get('/', (_, res) => {
	return res.send('Olá, dev!')
})

//exemplo de onde os dados chegam, middleware e controller
router.post('/cidades', 
CidadesController.createValidation, 
CidadesController.create
)

export { router }