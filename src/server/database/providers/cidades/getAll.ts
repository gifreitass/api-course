import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', Number(id))
            //todos os registros que contém a palavra inserida no filter, seria "nome like caxias"/"nome que contém caxias"
            .orWhere('nome', 'like', `%${filter}%`)
            //se o offset for 0 e o limite 10, pego 10 registros depois do 0
            .offset((page - 1) * limit)
            //limita quantos registros aparecem na pesquisa
            .limit(limit)

        //se o id não apareceu na consulta (por conta do limit), busco ele especificamente no knex
        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.cidade)
                .select('*')
                .where('id', '=', id)
                .first()
            
                if (resultById) {
                    return [...result, resultById]
                }
        }

        return result
    } catch (error) {
        return new Error('Erro ao consultar registros');
    }
}