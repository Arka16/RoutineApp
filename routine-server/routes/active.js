const express = require('express');
const router = express.Router();

const DataModel = require("../Database");

// Update activeMode and playPauseStates
router.put("/", async (req, res) => {
  console.log("Inside /ACTIVE");
  console.log(req.body);

  try {
    console.log(req.body)
    console.log("In try")
    const updatedDataModel = await DataModel.findOneAndUpdate(
      { username: req.body.username },
      {
        $set: {
          activeMode: !req.body.toggleChecked,
          playPauseStates: [...req.body.playPauseStates]
        }
      },
      { new: true } // To return the updated document
    );

    if (!updatedDataModel) {
      return res.status(404).json({ error: "Data model not found" });
    }

    console.log("After updating activeMode and playPauseStates");
    console.log(updatedDataModel);
    res.status(200).json({ message: 'Data saved successfully.', updatedDataModel });
  } catch (err) {
    console.log(req.body)
    console.error(err);
    res.status(500).json({ error: 'Failed to save data.' });
  }
});

// Retrieve activeMode
router.get("/:username", async (req, res) => {
  // console.log("inside get /ACTIVE ");
  try {
    const doc = await DataModel.findOne({ username: req.params.username })
    if (doc) {
      res.status(200).send({ toggleChecked: doc.activeMode, playPauseStates: doc.playPauseStates });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

// Export the router
module.exports = router;
