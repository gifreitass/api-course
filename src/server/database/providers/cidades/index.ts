// import * as getAll from './getAll'
import * as create from './create'
// import * as getById from './getById'
// import * as deleteById from './deleteById'
// import * as updateById from './updateById'


//isso vai simplificar o uso das controllers no arquivo de rotas
export const CidadesProvider = {
    //tudo do arquivo ficará acessível
    ...create,
    // ...getAll,
    // ...getById,
    // ...deleteById,
    // ...updateById
}
