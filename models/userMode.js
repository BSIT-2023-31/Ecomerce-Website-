const mongoose =  require('mongoose');




const userShema = new mongoose.Schema({
     fullname: String,
     email:String,
     password: String,
     cart:{
         type: Array,
         default: [],
     },
     orders:{
        type: Array,
        default: [],
     },
     contect: Number,
     picture: String,
})



module.exports =  mongoose.model('user',userShema);