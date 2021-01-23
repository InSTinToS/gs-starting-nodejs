const express = require('express')
const { uuid } = require('uuidv4')

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

const app = express()
app.use(express.json()) //? para todas as routes usar json no body

const projects = [] //? fake database

app.get('/projects', (req, res) => {
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