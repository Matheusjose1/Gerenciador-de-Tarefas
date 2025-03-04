import http from 'node:http'
import { json } from './middlewares/json.js';
import { rotas } from './rotas.js';
import { extractQueryParams } from './utils/extractQueryParams.js';

const servidor = http.createServer(async(req, res) => {

    const {method,url} = req
    
    await json (req,res)

    const rota = rotas.find(rota=> {
        return rota.method === method && rota.path.test(url)
    })

    if (rota){
        const rotaParam = req.url.match(rota.path)

        const {query,...params} = rotaParam.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return rota.handler(req,res)
    }
    return res.writeHead('404').end('Not found')
})

servidor.listen(5555)