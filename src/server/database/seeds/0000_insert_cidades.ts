import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

const cidadesSP = [
    "Acrelândia",
    "Assis Brasil",
    "Brasiléia",
    "Bujari",
    "Capixaba",
    "Cruzeiro do Sul",
    "Epitaciolândia",
    "Feijó",
    "Jordão",
    "Mâncio Lima",
    "Manoel Urbano",
    "Marechal Thaumaturgo",
    "Plácido de Castro",
    "Porto Acre",
    "Porto Walter",
    "Rio Branco",
    "Rodrigues Alves",
    "Santa Rosa do Purus",
    "Sena Madureira",
    "Senador Guiomard",
    "Tarauacá",
    "Xapuri"
]
  
//a seed sempre vai ser executada
export const seed = async (knex: Knex) => {
    //verificar a quantidade total de registros e ver se é maior que 0
    const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>('* as count')

    if (!Number.isInteger(count) || Number(count) > 0) return

    const cidadesToInsert = cidadesSP.map(cidade => ({ nome: cidade }))

    await knex(ETableNames.cidade).insert(cidadesToInsert)
}