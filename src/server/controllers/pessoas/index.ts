import * as getAll from './getAll'
import * as create from './create'
import * as getById from './getById'
import * as deleteById from './deleteById'
import * as updateById from './updateById'

export const PessoasController = {
    //tudo do arquivo ficará acessível
    ...create,
    // ...getAll,
    // ...getById,
    // ...deleteById,
    // ...updateById
}
