# Gerenciador de Tarefas

## Descrição

Trata-se de uma aplicação backend onde o usuário é capaz de criar e gerir tarefas no banco de dados por meio das operações básicos de CRUD (Create, Read, Update e Delete). 
Foi construído puramente com Node.js nativo e biblioteca externa csv.
Tal projeto foi criado para consolidar os conhecimentos dos fundamentos de Node.js

## Instrução de Instalação

### Pré Requisitos 

## Node 22.14.0
```bash
npm install csv@6.3.11
npm install csv-parse@5.6.0
```

## Instrução de Uso

1. Abra o insomnia para realizar requisições HTTP na porta 5555 mais facilmente

## Rotas HTTP

```bash
GET /tasks -- Lista todas as tasks disponíveis no banco
POST /tasks -- Adiciona uma nova task após preencher os campos no corpo da requisição
PUT /tasks/id -- Atualiza uma tarefa disponível por id(UUID)
PATCH /tasks/id -- Marca uma task como concluída 
DELETE /tasks -- Deleta uma task por  id
```
