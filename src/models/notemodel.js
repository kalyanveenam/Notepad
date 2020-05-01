
const mongoose=require('../db/mongoose')

const Note=mongoose.model('Note',{
    title:{
    type: String
    },
    note:{
    type: String
    },
    owner:{
     type: mongoose.Schema.Types.ObjectId,
     required : true,
      ref: 'User'
     
    }
    })
    
    
  module.exports=Note