const express =  require('express');
const router  =  express.Router();
const islogin = require('../middleware/isLogin');
const productModel =  require('../models/producModel');


router.get('/',function(req,res){
     res.render('index');
});
router.get('/shop',islogin, async  function(req, res){
    const products =  await productModel.find();
     res.render('shop' , products);
} )


module.exports =  router;