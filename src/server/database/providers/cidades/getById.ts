import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getById = async (id: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', '=', id)
            //seleciona a primeira cidade
            .first()

        if (result) {
            return result
        } 

        return new Error('Registro não localizado');
    } catch (error) {
        return new Error('Erro ao consultar registro');
    }
}