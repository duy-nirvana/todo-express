//const db = require("../db");
const shortId = require("shortid");
const mongoose = require('mongoose');
const sessionModel = require('../models/sessions');

module.exports = async (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortId.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    // db.get("sessions")
    //   .push({ id: sessionId })
    //   .write();
    var cart = [];
    // await sessionModel.create({
    //   cookieId: sessionId,
    //   cart: cart
    // });
  }
  
  var sessionId = req.signedCookies.sessionId;
  //var session = db.get('sessions').find({ id: sessionId }).value();
  var session = await sessionModel.findOne({ cookieId: sessionId });
  if (session)
    res.locals.numberInCart = (!session.cart) ? 0 : (session.cart).reduce((total, item) => {return total + parseInt(item.quantity)}, 0)
  else 
    res.locals.numberInCart = 0;
  next();
}