const mongoose = require('mongoose');

const URL = "mongodb://localhost/express"

const connect = async () => {
  await mongoose.connect(URL,
    {
      useNewUrlParser: true 
    }
  )
}


module.exports = connect;