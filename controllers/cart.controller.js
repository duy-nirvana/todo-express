const shortId = require('shortid');
const mongoose = require('mongoose');
const sessionModel = require('../models/sessions');
const userModel = require('../models/users')
const bookModel = require('../models/books')
const transactionModel = require('../models/transactions');

module.exports.index = async (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  var session = await sessionModel.findOne({ cookieId: sessionId });
  var books = [];
  for (var item of session.cart) {
    var book = await bookModel.findOne({ _id: item.bookId });
    books.push(book);
  }
  res.render('cart/index', {
    books: books
  });
}

module.exports.addToCart = async (req, res, next) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/books');
    return;
  }

  // var count = db
  //   .get('sessions')
  //   .find({ id: sessionId })
  //   .get('cart.' + bookId, 0)
  //   .value();
  var session = await sessionModel.findOne({ cookieId: sessionId });
  console.log(session);
  var count = 0;
  
  if (session) {
    // Trường hợp 1: BookId đã tồn tại trong giỏ hàng -> Tìm bookId rồi tăng số lượng.
    for (var i = 0; i < session.cart.length; i++) {
      if (session.cart[i].bookId === bookId) {
        count = session.cart[i].quantity + 1;
        await sessionModel.update({ 
          cookieId: sessionId, 
          "cart.$.booKId": bookId 
        }, { 
          $set: {
            "cart.$.quantity": count
          }
        }).exec();
        res.redirect('/books');
        return;
      }
    }
    // Trường hợp 2: BookId chưa có trong giỏ hàng
    await sessionModel.update({ 
          cookieId: sessionId, 
        }, { 
          $push: { cart: {
            "bookId": bookId,
            "quantity": 1
          }}
        }).exec();
    console.log("gì đó");
  }
  
  

  // var sessions = db.get('sessions')
  //   .find({ id: sessionId })
  //   .set('cart.' + bookId, count + 1)
  //   .write();

  res.redirect('/books');
}

module.exports.addTransaction = async (req, res, next) => {
  var q = req.query.q;
  var sessionId = req.signedCookies.sessionId;
  var listBookId = q.split(' ');
  for (var bookId of listBookId) {
    var id = shortId.generate();
    var newTransaction = new transactionModel({
      userId: req.signedCookies.userId,
      bookId: bookId,
      isComplete: false
    });
    await newTransaction.save();
    // db.get("sessions")
    // .remove({ id: req.signedCookies.sessionId})
    // .write();
    //res.clearCookie('sessionId');
  }
  await sessionModel.update({ 
          cookieId: sessionId
        }, { 
          $set: {
            cart: []
          }
        }).exec();
  
  res.redirect("/transactions");
}