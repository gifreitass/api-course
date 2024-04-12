import { genSalt, hash, compare } from "bcryptjs"

//quanto maior o número, mais complexa vai ser a criptografia, porém também vai demandar mais na hora de verificar a senha
const SALT_RANDOMS = 8

const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(SALT_RANDOMS)
    //salt: precisa ser gerado e adiciona ainda mais caracteres de forma aleatória para aumentar a segurança
    return await hash(password, saltGenerated)
}

//recebe a senha e a senha criptografada
const verifyPassword = async (password: string, hashedPassword: string) => {
    //compara as duas senhas e verifica se está correta (retorna um booleano)
    return await compare(password, hashedPassword)
}   

export const passwordCrypto = {
    hashPassword,
    verifyPassword
}