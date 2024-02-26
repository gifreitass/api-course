//permite criar uma espécie de middleware para o servidor, onde podemos especificar as nossas rotas
import { Router } from 'express'
import { CidadesController } from './../controllers'

const router = Router()

router.get('/', (_, res) => {
	return res.send('Olá, dev!')
})

//exemplo de onde os dados chegam, middleware e controller
router.post('/cidades', CidadesController.createValidation, CidadesController.create)
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll)
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById)
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById)
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById)

export { router }