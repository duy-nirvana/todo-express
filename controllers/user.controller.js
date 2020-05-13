const db = require('../db');
const shortid = require('shortid');
const cloudinary = require("cloudinary");

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

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

module.exports.postCreate = async (req, res) => {
  let name = req.body.name;
  let phone = req.body.phone;
  let path = req.file.path;
  let file = await cloudinary.uploader.upload(path);
  db.get("users")
    .push({
      id: shortid.generate(),
      name: name,
      phone: phone,
      avatar: file.url,
      isAdmin: false
    })
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