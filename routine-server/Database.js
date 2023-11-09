const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // Define the structure of your data here
    name: String,
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    table: [
        {
          time: String,
          task: String,
          goal: String,
          startTime: String,
          endTime: String
        },
      ]

  });

  const DataModel = mongoose.model('User_INFO', dataSchema);
  module.exports = DataModel