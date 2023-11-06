const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // Define the structure of your data here
    user_id: String,
    name: String,
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    table: [
        {
          time: String,
          task: String,
          goal: String
        },
      ]

  });

  const DataModel = mongoose.model('User_INFO', dataSchema);
  module.exports = DataModel