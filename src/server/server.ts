import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './shared/services/yupTranslations'
import { router } from './routes'

const server = express()

//vai resolver a questão do cors
//precisamos liberar o cors para o endereço do nosso front-end, como não sabemos o endereço usamos uma variável de ambiente
//split usado para poder passar mais de um endereço, separado por ;
server.use(cors({
    origin: process.env.ENABLED_CORS?.split(';') || []
}))
//para interpretar dados nesse formato
server.use(express.json())
//criamos a rota em um arquivo separado, e dentro do servidor estamos dizendo que o server vai fazer uso das rotas que criamos
server.use(router)

export { server }