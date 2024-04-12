import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

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

    console.log(authorization)

    //token do tipo bearer possui: 'Bearer' token
    const [ type, token ] = authorization.split(' ')

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    } 

    if (token !== 'teste.teste.teste') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    } 
    
    return next()
}