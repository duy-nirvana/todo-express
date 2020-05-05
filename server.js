// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const todos = [
   'Đi chợ',
    'Nấu ăn',
    'Đút gấu ăn',
    'Đút gấu ăn 2',
    'Học code trên CodersX'
]
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos', (req, res) => {
  res.render('index', {
    todos: todos
  })
})

app.get('/todos/search', (req, res) => {
  let q = req.query.q;
  let matchedTodos = todos.filter(todo => {
    return todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  
  res.render('index', {
    todos: matchedTodos
  })
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
