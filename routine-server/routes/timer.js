const express = require('express');
const router = express.Router();
const DataModel = require("../Database");

// Endpoint to get timer data
router.get('/:username', async (req, res) => {
    console.log("Inside get timer")
    try {
      const timerData = await DataModel.findOne({username: req.params.username});
      res.status(200).json(timerData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to update timer data
router.post('/:username', async (req, res) => {
    console.log("inside post timer")
    try {
      const { minutes, seconds, play, breaks, heading } = req.body;
      const timerData = await DataModel.findOneAndUpdate({username: req.params.username}, { minutes, seconds, timerState:play, breaks, heading }, { new: true});
      res.status(200).json(timerData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  module.exports = router;