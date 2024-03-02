import { Request, RequestHandler, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";

interface IBodyProps extends Omit<ICidade, 'id'> {}

//retornando um middleware para validação
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3)
    }))
}))

//esse método só será executado se passar na validação acima
export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body)

    return res.status(StatusCodes.CREATED).json(1)
}