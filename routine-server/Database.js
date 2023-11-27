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
    playPauseStates: [
      Boolean
    ],
    table: [
        {
          time: String,
          task: String,
          goal: String,
          startTime: String,
          endTime: String
        },
      ],
    
    
    minutes: {
      type: Number,
      default: 25
    },
    seconds: {
      type:  Number,
      default: 0
    },
    timerState: Boolean,
    breaks: Boolean,
    heading:String,
    selectedWorkOption: {
      type: Number,
      default: 3
    },
    selectedBreakOption: {
      type: Number,
      default: 1
    },

  });

  const DataModel = mongoose.model('User_INFO', dataSchema);
  module.exports = DataModel