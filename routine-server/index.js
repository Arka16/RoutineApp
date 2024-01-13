require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const app = express();
const port = 3000;

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())


const tableRoutes = require("./routes/tables")
const userRoutes = require("./routes/user")
const messageRoutes = require("./routes/message")
const activeRoutes = require("./routes/active")
const timerRoutes = require("./routes/timer")


// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
// Define a simple route
app.use("/tables", tableRoutes);
app.use("/user", userRoutes);
app.use("/active", activeRoutes)
app.use("/message", messageRoutes)
app.use("/timer", timerRoutes)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});