// users.js: handling routes for creating, logging in, and deleting user
const express = require('express');
const session = require('express-session');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
const DataModel = require("../Database");
const bcrypt = require("bcrypt")
const saltRounds = 10
const bodyParser = require("body-parser");
//getting user id
const passport = require('passport');
router.use(bodyParser.urlencoded({
  extended: true
}));



passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await DataModel.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Replace bcrypt logic if needed
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Additional checks or actions if needed

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


router.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));



router.get('/', async (req, res) => {
  console.log("getting user")
  try {
    doc = await DataModel.findOne(req.body.username)
    if (doc) {
      console.log('Found document:', doc);
      res.status(200).json({ message: "User Found" })
    } else {
      res.status(404).json({ message: "User not found" })
    }

  }
  catch (err) {
    console.error('Error:', err);

  }
});

router.post("/register", async function (req, res) {
  const { username, password } = req.body;
  console.log("IN POST REGISTER")
  try {
    await DataModel.register(new DataModel({ username }), password);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});


router.post("/", async (req, res) => {
  console.log("account info entered");
  console.log(req.body);

  try {
    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const userInfo = new DataModel({
      // Spread the request body and replace the password with the hashed version
      ...req.body,
      password: hashedPassword
    });

    console.log(userInfo);

    const data = await userInfo.save();
    const dataModelId = userInfo._id;
    console.log("ASDF");
    res.status(201).json({ _id: dataModelId, message: 'Data saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save data.' });
  }
});

//user logging in, lets user in if correct password is entered or if user exists
router.post("/login", passport.authenticate("local"), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.status(200).json({
    message: 'Authentication successful.',
    user: req.user
  });
});

// router.post("/login", async (req, res, next) => {
//   console.log("getting user in POST endpoint")
//   console.log(req.body)

//   try {
//     const doc = await DataModel.findOne({ username: req.body.username });

//     const data = {};

//     if (!doc) {
//       data["message"] = "Invalid username or password";
//       res.json(data);
//     } else {
//       const passwordMatch = await bcrypt.compare(req.body.password, doc.password);

//       if (passwordMatch) {
//         res.status(200).json({
//           message1: "Username already exists",
//           username: req.body.username,
//           tableExists: doc.table.length !== 0,
//         });
//       } else {
//         data["message"] = "Invalid username or password";
//         res.json(data);
//       }
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
//   next();
// });


//deleting a user
router.delete("/", async (req, res, next) => {
  console.log("DELETING USER")
  try {
    console.log("in delete try")
    console.log(req.body.username)
    doc = await DataModel.findOneAndDelete({ username: req.body.username })
    if (doc) {
      res.status(200).json({ message: "User successfully deleted" });
    }
    else {
      console.log("USER NOT FOUND")
      res.status(404).json({ error: "User not found" });
    }
    next()

  } catch (error) {
    console.log(error.message)
    res.status(503).json({ error: "Internal server error" })

  }
})



// Export the router
module.exports = router;