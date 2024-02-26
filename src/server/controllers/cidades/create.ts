import { Request, RequestHandler, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

//todos os parâmetros que vamos receber
interface ICidade {
    nome: string;
}

//retornando um middleware para validação
export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3)
    }))
}))

//esse método só será executado se passar na validação acima
export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado')
}