const express = require('express')

const { db } = require('./db')
const todoRoute = require('./routes/todos')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/Views'))

app.use('/todos', todoRoute)

db.sync()
  .then(() => {
    app.listen(process.env.PORT || 6565)
  })
  .catch((err) => {
    console.error(err)
  })
