const express = require("express");
const ownerModel = require("../models/ownerModel");

const router = express.Router();

router.get("/", function (req, res) {
  res.send("Helo world");
});

router.post("/create", async function (req, res) {
  const { fullname, email, password } = req.body;

  try {
    // Check if an owner with the same email already exists
    const existingOwner = await ownerModel.findOne({ email });

    if (existingOwner) {
      return res.status(400).send("Owner already exists");
    }

    // Create new owner if none exists
    const newOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.send(newOwner);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating owner");
  }
});

router.get('/admin',function(req, res){
 let success =  req.flash('success')
  res.render("createproducts" , {success});;
})
module.exports = router;
