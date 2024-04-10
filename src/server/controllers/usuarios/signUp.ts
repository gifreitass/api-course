import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

interface IBodyProps extends Omit<IUsuario, 'id'> { }

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6)
    }))
}))

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const existentUser = await UsuariosProvider.getByEmail(req.body.email)

    //não deu erro e o registro foi localizado
    if (existentUser) {
        res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: 'E-mail já cadastrado'
            }
        });
    }

    //validação para verificar se o usuário existe ou não
    if (existentUser instanceof Error && existentUser.message !== "Registro não localizado") {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: existentUser.message
            }
        });
    }

    const result = await UsuariosProvider.create(req.body)

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
}