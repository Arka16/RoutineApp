const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Arka21:Fooler%2321@cluster0.ykznhdg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const userToId = {}
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

app.get('/get-user/:username', async (req, res) => {
  console.log("getting user")
  try{
    const id = userToId[req.params.username]
    console.log(id)
    doc = await DataModel.findById(id)
    if (doc) {
      console.log('Found document:', doc);
      console.log(id)
      res.status(200).json({id:id})
    } else {
      res.status(404).json({message: "User not found"})
    }

  }
  catch(err){
    console.error('Error:', err);

  }
  
    
});

app.get('/get-data/:id', async (req, res) => {
  console.log("getting tables")
  try{
    doc = await DataModel.findById(req.params.id)
    if (doc) {
      console.log('Found document:', doc);
      res.status(200).json({data: doc})
    } else {
      res.status(404).json({message: "User not found"})
    }

  }
  catch(err){
    console.error('Error:', err);

  }
  
    
});
app.post("/create-account", async(req, res) => {
    console.log("account info entered");
    console.log(req.body)
    try{
      const userInfo = new DataModel({
        ...req.body
    });
   
      console.log(userInfo)
      const data = await userInfo.save();   
      const dataModelId = userInfo._id;
      userToId[userInfo.username] = userInfo._id;
      console.log("ASDF")
      res.status(201).json({_id: dataModelId,  message: 'Data saved successfully.'});

    }
    catch(error){
      console.log(req.body)
      console.error(error);
      res.status(500).json({ error: 'Failed to save data.' });
    }
   
})
app.post("/create-table", async (req, res) => {
    console.log("hi");
    console.log(req.body);

    try {
        console.log(req.body)
        console.log("In try")
        const updatedDataModel = await DataModel.findByIdAndUpdate(
          req.body.id,
          { $set: { table: req.body.rows } }, // Use $set to update the field
          { new: true } // To return the updated document
        );
  
        if (!updatedDataModel) {
          return res.status(404).json({ error: "Data model not found" });
        }
        console.log("After Update");
        console.log(updatedDataModel)
        res.status(201).json({ message: 'Data saved successfully.', updatedDataModel });
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
