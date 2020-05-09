const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
}

module.exports.search = (req, res) => {
  let q = req.query.q;
  let matchedUsers = db
    .get("users")
    .value()
    .filter(user => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

  res.render("users/index", {
    users: matchedUsers
  });
}

module.exports.delete = (req, res) => {
  let id = req.params.id;
  
  let user = db.get('users').remove({ id: id }).write();
  res.redirect('/users');
}

module.exports.view = (req, res) => {
  let id = req.params.id;
  
  let user = db.get('users').find({ id: id }).value();
  res.render('users/view', {
    user: user
  });
}

module.exports.create = (req, res) => {
  res.render('users/create')
}

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  let errors = [];
  
  if (!req.body.name) {
    errors.push('Name is required');
  }
  
  if (!req.body.phone) {
    errors.push('Phone is required');
  }
  
  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    }) 
    return;
  }
  
  db.get("users")
    .push(req.body)
    .write();

  res.redirect("/users");
}

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render("users/update", {
    id: id
  });
}

module.exports.postUpdate = function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
    db.get("users")
      .find({ id: id })
      .assign({ name: name })
      .write();

    res.redirect("/users");
}