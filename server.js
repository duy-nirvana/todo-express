// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");

const bookRoute = require('./routes/book.route');
const userRoute = require('./routes/user.route');
const transactionRoute = require('./routes/transaction.route');

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render('index');
});

app.use('/books', bookRoute)
app.use('/users', userRoute)
app.use('/transactions', transactionRoute);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
