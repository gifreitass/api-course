import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.cidade).where('id', '=', id).del()

        //0 erro e 1 sucesso, por isso o if abaixo
        if (result > 0) {
            return 
        } 

        return new Error('Erro ao deletar a cidade');
    } catch (error) {
        return new Error('Erro ao deletar a cidade');
    }
}