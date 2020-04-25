const express= require('express')
const Note=require('../src/models/notemodel')
//const router=express.Router()
const app=express()
app.use(express.json())
app.get('/notes',(req,res)=>{
    Note.find({}).then((Note)=>{
   res.send(Note);
    }).catch((error)=>{
   res.render(error)
    })
  
})

app.post('/notes',(req,res)=>{
    const reqbody=req.body
    console.log('reqbody')
    console.log(req.body)
    const note1= new Note(
        
         reqbody   
        )
        note1.save().then(()=>{
            console.log(note1)



        }).catch((error)=>{
            console.log(error)
        })

    res.send(note1) 
})
app.get('/notes/:id',(req,res)=>{
    const _id=req.params.id
    Note.findById(_id).then((note)=>{
        res.send(note)
    }).catch((error)=>{res.send(error)})
})

app.delete('/notes',(req,res)=>{
const _id=req.body
console.log(_id)
Note.deleteOne({_id:_id}).then((note)=>{
    res.status(200).send('Deleted')
}).catch((error)=>{res.send(error)})

})
module.exports=app