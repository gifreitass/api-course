import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

//pessoa tem relação com cidade, então antes de inserir a pessoa preciso verificar se a cidade existe para tentar fazer o vínculo
export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.cidade)
        .where('id', '=', pessoa.cidadeId)
        .count<[{ count: number }]>('* as count')

        if (count === 0) {
            return new Error('A cidade usada no cadastro não foi encontrada')
        }

        const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id')
    
        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        } 

        return new Error('Erro ao cadastrar pessoa')
    } catch (error) {
        return new Error('Erro ao cadastrar pessoa')
    }
}