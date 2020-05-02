const express= require('express')
const auth= require('../src/middleware/auth')
const Note=require('../src/models/notemodel')
//const router=express.Router()
const app=express()
app.use(express.json())
app.get('/notes',auth,async (req,res)=>{
    try{
    await req.user.populate('notes').execPopulate()

    res.send(req.user.notes)

    }
    
    catch(e){
   res.render(error)
    }
  
})

app.post('/notes',auth ,(req,res)=>{
    const reqbody=req.body
    console.log('reqbody')
    console.log(req.body)
    const note1= new Note(
        {
         ...reqbody,
         owner: req.user._id   
        }
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
//delete notes
app.delete('/notes/delete/:id',auth,(req,res)=>{  
const _id=req.params.id;
try{
Note.deleteOne({_id:_id}, {owner:req.user._id}).then((note)=>{
    res.status(200).send('Deleted')
})
}
catch(e){
  res.status(404).send()  
}
})
module.exports=app