import express from 'express'
import 'dotenv/config'
import './shared/services/yupTranslations'
import { router } from './routes'

const server = express()

//para interpretar dados nesse formato
server.use(express.json())
//criamos a rota em um arquivo separado, e dentro do servidor estamos dizendo que o server vai fazer uso das rotas que criamos
server.use(router)

export { server }