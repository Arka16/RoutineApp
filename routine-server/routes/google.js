const express = require('express');
const { google } = require('googleapis');

const router = express.Router();

// Replace with the path to your downloaded JSON file
const credentialsPath = 'path/to/your/credentials.json';

// Load credentials from JSON file
const credentials = require(credentialsPath);

// Create a Google Calendar API service
const calendar = google.calendar({
  version: 'v3',
  auth: new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/calendar']
  ),
});

// Define your function
async function addEventsToCalendar(req, res) {
  // Create event
  console.log("in schedule events");
  try {
    req.body.tables.forEach(async (e) => {
      const event = {
        summary: e.goals,
        description: e.task,
        start: { dateTime: e.startTime, timeZone: 'America/Los_Angeles' },
        end: { dateTime: e.endTime, timeZone: 'America/Los_Angeles' },
      };

      // Insert event into the primary calendar
      const calendarId = 'primary';
      const response = await calendar.events.insert({
        calendarId,
        resource: event,
      });

      console.log(`Event created: ${response.data.htmlLink}`);
    });
    res.status(200).send("Events added to calendar");
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Error creating event');
  }
}

// Export the function
module.exports = addEventsToCalendar;
