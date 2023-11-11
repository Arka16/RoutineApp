const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;

const dataSchema = new mongoose.Schema({
    // Define the structure of your data here
    name: String,
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    activeMode: Boolean,
    // playPauseStates: {state: Boolean},
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