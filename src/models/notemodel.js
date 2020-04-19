
const mongoose=require('../db/mongoose')

const Note=mongoose.model('Note',{
    title:{
    type: String
    },
    note:{
    type: String
    }
    })
    
    
  module.exports=Note