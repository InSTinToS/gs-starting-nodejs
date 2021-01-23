const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.json({message: 'Hello NodeJS'})
})

app.listen(3333, () => {
  console.log('Success')
});