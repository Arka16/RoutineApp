
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

  module.exports = router;