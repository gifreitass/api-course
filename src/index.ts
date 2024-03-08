import { Knex } from './server/database/knex'
import { server } from './server/server' 

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => console.log('app rodando'))
}

//ao iniciar a aplicação vai rodar as migrations e depois inicializar o servidor
//verificação com if para ver o ambiente (se estiver no localhost rodamos as migrations de forma manual, e não queremos que sejam executadas o tempo todo)
if (process.env.IS_LOCALHOST !== 'true') {
    Knex.migrate.latest().then(() => {
        startServer()
    })
    .catch(console.log)
} else {
    startServer()
}




