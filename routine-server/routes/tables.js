
const express = require('express');
const router = express.Router();

// const addEventsToCalendar =  require("./google")
const DataModel = require("../Database");

//getting table
router.get('/:username', async (req, res) => {
  //console.log("getting tables")
  // console.log(req.params)
  try{
    doc = await DataModel.findOne({username: req.params.username})
    if (doc) {
      //console.log('Found document:', doc);
      res.status(200).json({data: doc})
    } else {
      res.status(404).json({message: "User not found"})
    }

  }
  catch(err){
    console.error('Error:', err);

  }
  
    
});

//creating a schedule for the first time
router.post("/",  async (req, res) => {
    console.log("hi");

    try {
        console.log(req.body)
        console.log("In try")
        const updatedDataModel = await DataModel.findOneAndUpdate(
          {username: req.body.username},
          { $set: { table: req.body.rows } }, // Use $set to update the field
          { new: true } // To return the updated document
        );
  
        if (!updatedDataModel) {
          console.log("POST TABLES returns 404")
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

//updating a schedule
router.put("/",  async (req, res) => {
    console.log("hi");
    console.log(req.body);

    try {
        console.log(req.body)
        console.log("In try")
        const updatedDataModel = await DataModel.findOneAndUpdate(
          {username: req.body.username},
          { $set: { table: req.body.newRows } }, // Use $set to update the field
          { new: true } // To return the updated document
        );
        if (!updatedDataModel) {
        
          return res.status(404).json({ error: "Data model not found" });
        }
        console.log("After Delete Table");
        console.log(updatedDataModel)
        res.status(201).json({ message: 'Data saved successfully.', updatedDataModel });
    } catch (err) {
        console.log(req.body)
        console.error(err);
        res.status(500).json({ error: 'Failed to save data.' });
    }

}); 

//deleting a table
router.put("/del", async (req, res, next)=>{
  console.log("Delete Table")
  console.log(DataModel)
  console.log(req.body.id)
  try {
    const updatedDataModel = await DataModel.findOneAndUpdate({username:req.body.username},
      { $set: { table: [] } }, // Use $set to update the field
      { new: true } // To return the updated document   
      )
      if (!updatedDataModel) {
        console.log("USER DOES NOT EXIST")
        return res.status(404).json({ error: "Data model not found" });
      }
    res.status(200).send({message: "Succesfully Deleted"})  
  } catch (error) {
    console.log(error.message);
  }
  next()
})


// Export the router
module.exports = router;
