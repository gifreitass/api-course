import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { CidadesProvider } from "../../database/providers/cidades";

interface IParamProps {
    id?: number
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}))

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    const result = await CidadesProvider.deleteById(req.body)

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    if(Number(req.params.id) === 9999) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Registro não encontrado'
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).send()
}