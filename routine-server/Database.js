const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
// mongoose.set("useCreateIndex",true)
const passportLocalMongoose = require("passport-local-mongoose")
const passport = require('passport');
const db = mongoose.connection;




const dataSchema = new mongoose.Schema({
    // Define the structure of your data here
    name: String,
    username: { type: String, unique: true },
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
  dataSchema.plugin(passportLocalMongoose)
  // const secret = process.env.SECRET;


  //dataSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

  const DataModel = mongoose.model('User_INFO', dataSchema);
  passport.use(DataModel.createStrategy())
  passport.serializeUser(DataModel.serializeUser());
  passport.deserializeUser(DataModel.deserializeUser());

  module.exports = DataModel