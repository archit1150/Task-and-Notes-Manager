const { Router } = require('express')
const { Todos } = require('../db')
const { Notes } = require('../db')

const route = Router()

route.get('/', async (req, res) => {
  const todos = await Todos.findAll()
  res.send(todos)
})

route.get('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',
    })
  }
  
  const todo = await Todos.findByPk(req.params.id)

  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
  res.send(todo)
})
route.get('/:id/notes', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'note id must be an integer',
    })
  }
  
  const note = await Notes.findByPk(req.params.id)

  if (!note) {
    return res.status(404).send({
      error: 'No note found with id = ' + req.params.id,
    })
  }
  res.send(note)
})


route.post('/', async (req, res) => {
  if (typeof req.body.title !== 'string') {
    return res.status(400).send({ error: 'Task name not provided' })
  }
  const newTodo = await Todos.create({
      title: req.body.title,
      done: req.body.done,
      due: req.body.due,
      description: req.body.description,
      priority:req.body.priority
  })

  res.status(201).send({ success: 'New task added', data: newTodo })
})

route.post('/:id/notes', async (req, res) => {
  if (typeof req.body.note !== 'string') {
    return res.status(400).send({ error: 'Note name not provided' })
  }
  note1= await Notes.findByPk(req.params.id)
   if(!note1){
    const newNote = await Notes.create({
      id: req.params.id,
      note: req.body.note,
    })
    res.status(201).send({ success: 'New note added', data: newNote })
   }
     note1.note +=' ,'+req.body.note
     await note1.save()
  res.status(201).send({ success: 'New note added', data: note1 })
})

route.patch('/:id', async (req, res) => {
  let todo = await Todos.findByPk(req.params.id)
  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
      todo.done= req.body.done,
      todo.due=req.body.due,
      todo.priority=req.body.priority

      await todo.save()

  res.status(201).send({ success: 'task updated ', data: todo })
})

module.exports = route
