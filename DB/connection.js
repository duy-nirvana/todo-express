const mongoose = require('mongoose');

const URL = "mongodb+srv://duy-nirvana:" + process.env.mongodb_password + "@cluster0-so3bl.mongodb.net/test?retryWrites=true&w=majority"

const connect = async () => {
  await mongoose.connect(URL,
    {
      useNewUrlParser: true 
    }
  )
}


module.exports = connect;