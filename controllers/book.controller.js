const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let matchedBooks = db
    .get("books")
    .value()
    .filter(book => {
      return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

  res.render("books/index", {
    books: matchedBooks
  });
}

module.exports.delete = (req, res) => {
  let id = req.params.id;
  
  let book = db.get('books').remove({ id: id }).write();
  res.redirect('/books');
}

module.exports.view = (req, res) => {
  let id = req.params.id;
  
  let book = db.get('books').find({ id: id }).value();
  res.render('books/view', {
    book: book
  });
}

module.exports.create = (req, res) => {
  res.render('books/create')
}

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  
  db.get("books")
    .push(req.body)
    .write();

  res.redirect("/books");
}

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render("books/update", {
    id: id
  });
}

module.exports.postUpdate = function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
    db.get("books")
      .find({ id: id })
      .assign({ name: name })
      .write();

    res.redirect("/books");
}