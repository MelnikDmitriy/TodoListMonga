const Todo = require('./modelMonga');
const express = require('express');

const app = express();

app.get('/', async (req, res) => {
  const todos = await Todo.find({}).lean().sort({ completed: 1 }).lean();

  res.render('index', {
    todos,
  });
});

app.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  await todo.save();

  res.redirect('/');
});

app.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  todo.completed = !!req.body.completed;
  await todo.save();

  res.redirect('/');
});

app.post('/save', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  todo.edited = false;
  todo.title = req.body.title;

  await todo.save();

  res.redirect('/');
});

app.post('/delete', async (req, res) => {
  await Todo.findByIdAndDelete(req.body.id);

  res.redirect('/');
});

app.post('/return', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  todo.edited = false;
  todo.save();

  res.redirect('/');
});

app.post('/edit', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  todo.edited = true;
  await todo.save();

  res.redirect('/');
});

module.exports = app;
