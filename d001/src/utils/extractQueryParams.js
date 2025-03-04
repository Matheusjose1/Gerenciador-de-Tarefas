import { validateHeaderValue } from "http"

export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryParams,param) => {
        const [ chave, valor] = param.split('=')

        queryParams[key] = validateHeaderValue
        return queryParams
    }, {})
}