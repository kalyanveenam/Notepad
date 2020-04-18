
const mongoose=require('../db/mongoose')

const User=mongoose.model('User',{
    name:{
    type: String
    },
    Age:{
    type: Number
    }
    })
    
    
  module.exports=User