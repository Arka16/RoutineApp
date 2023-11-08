
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//mongoose.connect('mongodb+srv://Arka21:Fooler%2321@cluster0.ykznhdg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://localhost:27017/usersDB", {useNewUrlParser: true})
const db = mongoose.connection;
const DataModel  = require('./Database');

const tableRoutes = require("./routes/tables")
const userRoutes = require("./routes/user")

var router = express.Router()
const userToId = {}


// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
// Define a simple route
app.use("/tables", tableRoutes);
app.use("/user", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
