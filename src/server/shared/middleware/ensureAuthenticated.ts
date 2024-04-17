import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";

//vai validar se o usuário está autenticado
export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    //se o usuário tiver um header chamado authorization com um token (jwt) autenticando ele, ele poderá acessar
    const { authorization } = req.headers
    //se não tiver nada no authorization, dará erro
    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    }

    //token do tipo bearer possui: 'Bearer' token
    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    }

    const jwtData = JWTService.verify(token)

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao verificar o token'
            }
        })
    } else if (jwtData === 'INVALID_TOKEN') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    }

    //resgatamos o id do user no jwt, e precisamos deixar ele disponível nos headers para ser utilizado (em outros arquivos, por exemplo)
    req.headers.idUsuario = jwtData.uid.toString()

    return next()
}