import { RequestHandler } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middleware";

interface ICidade {
    nome: string;
}

interface IFilter {
    filter?: string,
}

//retornando um middleware para validação
export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(3)
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().required().min(3),
    }))
}))

//esse método só será executado se passar na validação acima
export const create: RequestHandler = async (req, res) => {
    console.log(req.body)

    return res.send('Create')
}