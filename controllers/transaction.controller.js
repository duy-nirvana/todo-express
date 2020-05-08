const shortid = require('shortid');
const db = require('../db');

module.exports.index = (req, res) => {
  var transactions = db.get('transactions').value();
  var lists = [];
  for (var item of transactions) {
    var userId = item.userId;
    var bookId = item.bookId;
    lists.push({
      id: shortid.generate(),
      user: db.get('users').find({ id: userId }).value().name,
      book: db.get('books').find({ id: bookId }).value().name,
      isComplete: item.isComplete
    })
  }
  res.render('transactions/index', {
    transactions: lists
  })
}

module.exports.create = (req, res) => {
  res.render('transactions/create', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
}

module.exports.postCreate = (req, res) => {
  let user = req.body.userSelect;
  let book = req.body.bookSelect;
  let id = shortid.generate();
  
  console.log(user, book);
  console.log(req.body.userSelect, req.body.bookSelect);
  db.get('transactions').push({
    id: id,
    userId: db.get('users').find({ name: user }).value().id,
    bookId: db.get('books').find({ name: book }).value().id,
    isComplete: false
  }).write()
  res.redirect('/transactions');
};

module.exports.complete = (req, res) => {
  db.get('transactions')
  .find({ id: req.params.id})
  .assign({ isComplete: true })
  .write();
  res.redirect('/transactions');
};