// users.js
const express = require('express');
const router = express.Router();


//getting user id
router.get('/', async (req, res) => {
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

//getting user data
router.get('/:id', async(req, res) => {
  // Handle user details
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


//creating user
router.post("/", async (req, res) => {
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

});



// Export the router
module.exports = router;
