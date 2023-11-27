const express = require('express');
const router = express.Router();
const DataModel = require("../Database");



router.post("/options1", async(req,res)=>{
  console.log("inside /timer/options1")
    try{
      const {username, selectedWorkOption} = req.body
      await DataModel.findOneAndUpdate({username: username}, {selectedWorkOption}, {new:true})
      res.status(200).json({message: "time options updated"})
    }
   catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post("/options2", async(req,res)=>{
  console.log("inside /timer/options2")
    try{
      const {username, selectedBreakOption} = req.body
      console.log("selected Break Option is")
      console.log(selectedBreakOption)
      await DataModel.findOneAndUpdate({username: username}, {selectedBreakOption: selectedBreakOption}, {new:true})
      res.status(200).json({message: "time options updated"})
    }
   catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get("/options/:username", async(req,res)=>{
  //console.log("inside get /timer/options");
  try {
    const doc = await DataModel.findOne({username: req.params.username})
    res.status(200).json(doc)
  } catch (error) {
    console.log("error")
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
})

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