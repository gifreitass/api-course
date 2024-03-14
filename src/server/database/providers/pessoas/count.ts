import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"

//number: quantidade total de registros no banco para o filter
export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.pessoa)
        .where('nomeCompleto', 'like', `%${filter}%`)
        .count<[{ count: number }]>('* as count')
       
        if (Number.isInteger(Number(count))) return Number(count)
        return new Error('Erro ao consultar a quantidade total de registros')
    } catch (error) {
        return new Error('Erro ao consultar a quantidade total de registros')
    }
}