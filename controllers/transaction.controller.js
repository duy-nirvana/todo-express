const shortid = require('shortid');
const db = require('../db');

module.exports.index = (req, res) => {
  //let user = db.get('users').find({id: parseInt(req.signedCookies.userId)}).value();
  let transactions = db.get('transactions').value();
  let lists = [];
  for (let item of transactions) {
    let userId = item.userId;
    let bookId = item.bookId;
    lists.push({
      id: item.id,
      user: db.get('users').find({ id: userId }).value().name,
      book: db.get('books').find({ id: bookId }).value().title,
      isComplete: item.isComplete
    })
  }
  console.log(lists)
  
  
  res.render('transactions/index', {
    transactions: lists
  })
  console.log(transactions)
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
  let id = req.params.id;
  if(db.get('transactions').find({id})) {
    db.get('transactions').find({id}).assign({isComplete: true}).write();
  }
  res.redirect('/transactions');
};