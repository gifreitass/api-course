//permite criar uma espécie de middleware para o servidor, onde podemos especificar as nossas rotas
import { Router } from 'express'
import { CidadesController, PessoasController, UsuariosController } from './../controllers'
import { signUpValidation } from '../controllers/usuarios/signUp'

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

router.post('/pessoas', PessoasController.createValidation, PessoasController.create)
router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll)
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById)
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById)
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById)

router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp)
router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn)


export { router } 