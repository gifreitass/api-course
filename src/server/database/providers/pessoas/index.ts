import * as create from './create'
import * as getById from './getById'
import * as deleteById from './deleteById'
import * as updateById from './updateById'
import * as getAll from './getAll'
import * as count from './count'

export const CidadesProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...deleteById,
    ...updateById,
    ...count
}
