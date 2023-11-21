require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;



const tableRoutes = require("./routes/tables")
const userRoutes = require("./routes/user")
const messageRoutes = require("./routes/message")
const activeRoutes = require("./routes/active")



// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
// Define a simple route
app.use("/tables", tableRoutes);
app.use("/user", userRoutes);
app.use("/active", activeRoutes)
app.use("/message", messageRoutes)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
