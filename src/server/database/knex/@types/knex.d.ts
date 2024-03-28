import { ICidade, IPessoa } from "../../models";

//arquivo de definição de tipagens
declare module 'knex/types/tables' {
    interface Tables {
        cidade: ICidade,
        pessoa: IPessoa
        //usuario: IUsuario
    }
}