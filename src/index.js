const express = require('express')

const app = express()
app.use(express.json()) //? para todas as routes usar json no body

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

app.get('/projects', (req, res) => {
  const { title, owner} = req.query
  console.log(title, owner)

  return res.json(['Projeto 1', 'Projeto 2'])
})

app.post('/projects', (req, res) => {
  const body = req.body
  console.log(body)

  return res.json(['Projeto 1', 'Projeto 2', 'Projeto 3'])
})

app.put('/projects/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  return res.json(['Projeto 1', 'Projeto 2', 'Projeto 4'])
})

app.delete('/projects/:id', (req, res) => {
  return res.json(['Projeto 1', 'Projeto 2'])
})

app.listen(3333, () => {
  console.log('Success')
});