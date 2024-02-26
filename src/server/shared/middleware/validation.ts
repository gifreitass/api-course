import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup"

type TProperty = 'body' | 'header' | 'params' | 'query'

//quem utilizar o TGetSchema vai poder dizer qual é a tipagem utilizada na função
type TGetSchema = <T extends AnyObject | Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

//record: tipagem de objeto
type TAllSchemas = Record<TProperty, ObjectSchema<any>>

//retorna todos os schemas de uma vez
//partial: não são todos os campos obrigatórios (header e params)
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema)

    //erros que vamos devolver ao usuário
    const errorsResult: Record<string, Record<string, string>> = {}

    //entries transforma o objeto em um array, e o foreach faz a iteração em cada um dos elementos do array
    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            //abortEarly valida todos os campos incorretos
            //validateSync não retorna uma promise, ele espera a validação acontecer e depois dá a resposta
            schema.validateSync(req[key as TProperty], { abortEarly: false });
        } catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {}

            yupError.inner.forEach(error => {
                if (!error.path) {
                    return
                }
                errors[error.path] = error.message
            })

            errorsResult[key] = errors
        }
    })

    if (Object.entries(errorsResult).length === 0) {
        //next diz para executar o próximo handler da fila
        return next()
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ errorsResult })
    }
}
