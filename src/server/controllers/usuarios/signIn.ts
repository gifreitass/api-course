import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { JWTService, passwordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6)
    }))
}))

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, senha } = req.body

    const user = await UsuariosProvider.getByEmail(email)

    if (user instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'E-mail ou senha inválidos'
            }
        });
    }

    const passwordValidation = await passwordCrypto.verifyPassword(senha, user.senha)

    if (!passwordValidation) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'E-mail ou senha inválidos'
            }
        });
    } else {
        const accessToken = JWTService.sign({ uid: user.id })
        
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'E-mail ou senha inválidos'
                }
            });
        }

        return res.status(StatusCodes.OK).json(accessToken)
    }
}