import fs from 'node:fs/promises'
import { json } from 'node:stream/consumers'

const bancoDadosPath = new URL('../banco.json',import.meta.url)

export class BancoDados {
    #bancoDados = {} 
    // banco é um objeto privado
    // construtor do banco de dados
    // promise que lê os dados no formato utf 8 e passa pra Json
    constructor(){
        fs.readFile(bancoDadosPath,'utf-8').then(dados => {
            this.#bancoDados = JSON.parse(dados)
        })
        .catch (() => {
            this.#persistir()
        })
    }
    //Transforma os dados do json para uma String
    #persistir(){
        fs.writeFile(bancoDadosPath, JSON.stringify(this.#bancoDados))
    }

    //

    select(tabela, pesquisa){
        let dados = this.#bancoDados[tabela]?? []

        if (pesquisa){
            dados = dados.filter(linha => {
                return Object.entries(pesquisa).some(([chave,valor]) => {
                    if (!valor) return true
                    return linha[chave].includes(valor)
                })
            })
        }
        return dados
    }

    insert (tabela, dados){
        if (Array.isArray(this.#bancoDados[tabela])){
            this.#bancoDados[tabela].push(dados)
        } else {
            this.#bancoDados[tabela] = [dados]
        }

        this.#persistir();
        return dados;
    }

    update(tabela,id,dados){
        const linhaIndex = this.#bancoDados[tabela].findIndex(linha => linha.id === id)

        if (linhaIndex > -1){
            this.#bancoDados[tabela][linhaIndex] = {id,...dados}
            this.#persistir()
        }
    }

    delete (tabela, id) {
        const linhaIndex = this.#bancoDados[tabela].findIndex(linha => linha.id === id)

        if (linhaIndex > -1){
            this.#bancoDados[tabela].splice(linhaIndex,1)
            this.#persistir()
        }
    }
}