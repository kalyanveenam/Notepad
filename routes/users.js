const express= require('express')
const User=require('../src/models/usermodel')
//const router=express.Router()
const app=express()
app.use(express.json())
app.get('/users',(req,res)=>{
    User.find({}).then((User)=>{
        res.send(User);
         }).catch((error)=>{
        res.send(error)
         })
})

app.post('/users',(req,res)=>{
    const reqbody=req.body
    console.log('reqbody')
    console.log(req.body)
    const user1= new User(
        
         reqbody   
        )
        user1.save().then(()=>{
            console.log(user1)
        }).catch((error)=>{
            console.log(error)
        })

    res.send(user1) 
})
app.get('/users/:id',(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        res.send(user)
        res.render('')
    }).catch((error)=>{res.send(error)})
})
module.exports=app