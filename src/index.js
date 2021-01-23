const express = require('express')
const { uuid, isUuid } = require('uuidv4')

//! Métodos HTTP
//? GET: Obter dados
//? POST: Enviar dados
//? PUT/PATCH: Alterar dados
//? DELETE: Remover dados

//! Tipos de Parametros
//? Query: Filtros e paginação 
//? como enviar para o back: base_url/route/?<label>=<value>&<label>=<value>
//? como receber do front: req.query

//? Route: Idenficar (atualizar/deletar)
//? como enviar para o back: base_url/route/<value>
//? como receber do front: req.params (adicionar route/:<label>)

//? Body: Forma padrão
//? como enviar para o back: {} JSON
//? como receber do front: req.body

//! Repostas HTTP
//? Respostas de informação (100-199),
//? Respostas de sucesso (200-299),
//? Redirecionamentos (300-399)
//? Erros do cliente (400-499)
//? Erros do servidor (500-599).

//! Middleware
//? Interceptador de requisições
//? É uma função(req, res, next) {}
//? que pode alterar dados ou interrompe-la (retornado algo)
//? rotas são um tipo de middlewares
//? next() é usado para dar seguimento ao app
//? se nao usar next ficara em loop infinito
//? código q vir após o next sera executado depois da rota

const projects = [] //? fake database

const app = express()
app.use(express.json()) //? para todas as routes usar json no body


function logReq(req, res, next) {
  const { method, url } = req
  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.log(logLabel)
  next()
}

function validateProjectId(req, res, next) {
  const { id } = req.params

  return !UUid(id) ? res.status(400).json({ error: "Invalid project id" }) : next()
}

//app.use(logReq) //? usar o middleware logReq em todas as rotas
app.use('/projects/:id', validateProjectId) //? usar na rota projects/:id

app.get('/projects', logReq, (req, res) => {
  const { title } = req.query
  const results = title ? projects.filter(project => project.title.includes(title)) : projects

  return res.json(results)
})

app.post('/projects', (req, res) => {
  const { title, owner } = req.body
  const project = { id: uuid(), title, owner }

  projects.push(project)
  return res.json(project)
})

app.put('/projects/:id', (req, res) => {
  const { id } = req.params
  const { title, owner } = req.body

  const projectIndex = projects.findIndex(project => project.id === id)
  if (projectIndex < 0) return res.status(400).json({ error: 'project not found' })

  const project = {
    id, title, owner
  }

  projects[projectIndex] = project

  return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params

  const projectIndex = projects.findIndex(project => project.id === id)
  if (projectIndex < 0) return res.status(400).json({ error: 'project not found' })

  projects.splice(projectIndex, 1)

  return res.status(204), send()
})

app.listen(3333, () => {
  console.log('Success')
});