const express  = require('express');
const upload =  require('../config/multer-config')
const router =  express.Router();
const productModel = require('../models/producModel');

router.get('/',function(req, res){
     res.send("Helo world")
});
router.post('/create',upload.single('image') ,async function(req, res){
     let {name , price ,discount , bgcolor, panelcolor, textcolor} = req.body;
      try {
          const product = await productModel.create({
                image: req.file.buffer,
                name,
                price,
                discount,
                bgcolor,
                panelcolor,
                textcolor, 
          })
          req.flash("success" , "product created susscefully");
         res.redirect('/api/owner/admin');
      } catch (error) {
          console.log(error);
      }
})


module.exports =  router;
