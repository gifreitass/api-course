import { Request, RequestHandler, Response } from "express";
import { IPessoa } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from 'yup'
import { PessoasProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nomeCompleto: yup.string().required().min(3),
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required().min(1)
    }))
}))

export const create: RequestHandler = async (req: Request<{}, {}, IPessoa>, res: Response) => {
    const result = await PessoasProvider.create(req.body)

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        }) 
    }

    return res.status(StatusCodes.CREATED).json(result)
}