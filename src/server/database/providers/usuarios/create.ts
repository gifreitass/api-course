import { passwordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
    try {
        const hashedPassword = await passwordCrypto.hashPassword(usuario.senha)
        //antes de inserir o usuário, precisamos incluir uma senha criptografada para ele
        const [result] = await Knex(ETableNames.usuario).insert({...usuario, senha: hashedPassword}).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        } 

        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        return new Error('Erro ao cadastrar registro');
    }
}