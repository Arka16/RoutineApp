const express = require('express');
const router = express.Router();

//creating a schedule for the first time
app.post("/:id",  async (req, res) => {
    console.log("hi");
    console.log(req.body);

    try {
        console.log(req.body)
        console.log("In try")
        const updatedDataModel = await DataModel.findByIdAndUpdate(
          req.params.id,
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

//updating a schedule
app.put("/:id",  async (req, res) => {
    console.log("hi");
    console.log(req.body);

    try {
        console.log(req.body)
        console.log("In try")
        const updatedDataModel = await DataModel.findByIdAndUpdate(
          req.params.id,
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

// Export the router
module.exports = router;
