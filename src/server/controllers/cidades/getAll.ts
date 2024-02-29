import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    }))
}))

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    //o navegador só terá acesso ao header quando usarmos o expose headers
    res.setHeader('acess-control-expose-headers', 'x-total-count')
    //seta o valor do header
    res.setHeader('x-total-count', 1)

    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            nome: 'São Paulo'
        }
    ])
}