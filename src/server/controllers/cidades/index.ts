import * as create from './create'

//isso vai simplificar o uso das controllers no arquivo de rotas
export const CidadesController = {
    //tudo do arquivo ficará acessível
    ...create,
}
