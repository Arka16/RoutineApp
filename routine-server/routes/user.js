// users.js
const express = require('express');
const router = express.Router();

const DataModel = require("../Database");
//getting user id
router.get('/', async (req, res) => {
    console.log("getting user")
    try{
      console.log(id)
      doc = await DataModel.findOne(req.body.username)
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
    doc = await DataModel.findOne(req.body.username)
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
      console.log("ASDF")
      res.status(201).json({_id: dataModelId,  message: 'Data saved successfully.'});

    }
    catch(error){
      console.log(req.body)
      console.error(error);
      res.status(500).json({ error: 'Failed to save data.' });
    }

});

router.post("/login", async (req, res, next) => {
  console.log("getting user in POST enpoint")
  console.log(req.body)
  try{
    //const id = userToId[req.body.username]
    console.log(req.body)
    console.log("Password from request is " + req.body.password)
   
    doc = await DataModel.findOne({username: req.body.username})
    console.log("DOC IS")
    console.log(doc)
    if(doc){
      console.log(doc.password)

    }
    if (!doc || doc.password !== req.body.password) {
      console.log("ASDFADSFDS")
      res.json({message: "Invalid username or password"})
    } else {
      res.status(200).json({username: req.body.username})
      
    }

  }
  catch(err){
    console.error('Error:', err);

  }
  next()
})

router.delete("/", async (req, res, next) => {
  console.log("DELETING USER")
  try {
    console.log("in delete try")
    console.log(req.body.username)
    doc = await DataModel.findOneAndDelete({username: req.body.username})
    if(doc){
      res.status(200).json({message: "User successfully deleted"});
    }
    else{
      console.log("USER NOT FOUND")
      res.status(404).json({error: "User not found"});
    }
    next()
    
  } catch (error) {
    console.log(error.message)
    res.status(503).json({error: "Internal server error"})
    
  }
})



// Export the router
module.exports = router;
