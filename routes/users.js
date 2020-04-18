const express= require('express')
const User=require('../src/models/usermodel')
//const router=express.Router()
const app=express()
app.use(express.json())
app.get('/users',(req,res)=>{
    res.render('login')
})
app.get('/',(req,res)=>{
   
    res.send('namaste')
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
module.exports=app