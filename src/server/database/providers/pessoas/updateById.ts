import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .update(pessoa)
            .where('id', '=', id)

        //sucesso
        if (result > 0) return;

        return new Error('Erro ao atualizar pessoa');
    } catch (error) {
        return new Error('Erro ao atualizar pessoa');
    }
}