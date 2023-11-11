
const express = require('express');

const router = express.Router();
const DataModel = require("../Database");
const twilio = require('twilio');

// Twilio credentials



const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID
// Initialize Twilio client
const client = twilio(accountSid, authToken);


// Endpoint to send reminder
router.post('/', async (req, res) => {
    console.log("IN MESSAGE ROUTE")
    const {username, index} = req.body
    try {
      const doc = await DataModel.findOne({username: username})
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

    

      console.log("REMINDER to start task" + doc.table[index].task)
      console.log(`Current time: ${hours}:${minutes}:${seconds}`);
      //console.log(`Reminder sent with SID: ${reminderMessage.sid}`);
      res.json({ success: true });
    } catch (error) {
      console.error('Error sending reminder:', error.message);
      res.status(500).json({ error: 'Failed to send reminder' });
    }
  });

  router.post("/toggle", async(req,res) => {
    const {username, index, toggle} = req.body
    try {
        const doc = await DataModel.findOneAndUpdate({username: username},
            { $set: { activeMode: toggle } }, // Use $set to update the field
          { new: true } // To return the updated document
          )

        
    } catch (error) {
        console.error('Error updating toggle state:', error.message);
        res.status(500).json({ error: 'Failed updating toggle'}); 
    }
      
  })

//   router.post("/play", async(req,res) => {
//     const {username, index, playPauseStates} = req.body
//     try {
//         const doc = await DataModel.findOneAndUpdate({username: username},
//             { $set:  playPauseStates[index]: playPauseStates[index] }, // Use $set to update the field
//           { new: true } // To return the updated document
//           )

        
//     } catch (error) {
//         console.error('Error updating toggle state:', error.message);
//         res.status(500).json({ error: 'Failed updating toggle'}); 
//     }
      
//   })

  module.exports = router;