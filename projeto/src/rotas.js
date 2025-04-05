import { randomUUID } from "node:crypto";
import { BancoDados } from "./bancoDados.js";
import { buildRoutePath } from "./utils/buildRoutePath.js";


const bancoDados = new BancoDados()

export const rotas = [
    {
        method:'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {pesquisa} = req.query
            
            const tasks = bancoDados.select('tasks',{
                titulo: pesquisa,
                descricao: pesquisa,
            
            })
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {titulo, descricao} = req.body

            if (!titulo){
                return res.writeHead(400).end(
                    JSON.stringify({message: "Titulo é necessário"})
                )
            }

            if (!descricao){
                return res.writeHead(400).end(
                    JSON.stringify({message: "Descrição é necessária"})
                )
            }

            const task = {
                id: randomUUID(),
                titulo,
                descricao,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),

            }

            bancoDados.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath ('/tasks/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const {titulo, descricao} = req.body 
            
            if (!titulo && !descricao){
                return res.writeHead(400).end(JSON.stringify({message: "Titulo ou descrição necessários"}))            
            }

            const [task] = bancoDados.select('tasks', {id})
                
                if(!task){
                return res.writeHead(404).end(JSON.stringify({error: 'Task não encontrada'}))
            }

            bancoDados.update('tasks', id , {
                    titulo: titulo ?? task.titulo,
                    descricao: descricao ?? task.descricao,
                    update_at: new Date()
                } )
                
            return res.writeHead(204).end()
        },
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res) => {
            const {id} = req.params


            const [task] = bancoDados.select('tasks', {id})
            if(!task){
                return res.writeHead(404).end(JSON.stringify({error: 'task não encontrada'}))
            }

            bancoDados.delete('tasks', id)

            return res.writeHead(204).end()
        },

    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const id = req.params
            
            const [task] = bancoDados.select('tasks',{id})

            if (!task){
                return res.writeHead(404).end()
            }

            const isTaskCompleted = !!task.completed_at
            const completed_at = isTaskCompleted ? null : new Date()

            bancoDados.update('tasks', id, {completed_at})
                return res.writeHead(204).end()
        },
    }
]