const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Arka21:Fooler%2321@cluster0.ykznhdg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


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


const DataModel = mongoose.model('Data', dataSchema);

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
// Define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post("/create-table", async (req, res) => {
    console.log("hi");
    console.log(req.body);

    try {
        const newData = new DataModel({
            user_id: "001",
            name: "Arka",
            username: "Arka21",
            password: "Fooler#21",
            email: "arka.pal.0521@gmail.com",
            phoneNumber: "650-720-6249",
            table: req.body
        });

        const data = await newData.save();
        res.status(201).json({ message: 'Data saved successfully.', data });
    } catch (err) {
        console.log(req.body)
        console.error(err);
        res.status(500).json({ error: 'Failed to save data.' });
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
