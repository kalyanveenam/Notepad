const express= require('express')
const User=require('../src/models/usermodel')
//const router=express.Router()
const app=express()
app.use(express.json())
app.get('/users',async (req,res)=>{

   await User.find({}).then((User)=>{
        res.send(User);
         }).catch((error)=>{
        res.send(error)
         })
})

app.post('/users', async (req,res)=>{
    const reqbody=req.body
    const user1= new User(
        
         reqbody   
        )
       await user1.save().then(()=>{
            console.log(user1)
        }).catch((error)=>{
            console.log(error)
        })

    res.send(user1) 
})
app.get('/users/:id',async (req,res)=>{
    const _id=req.params.id
   await User.findById(_id).then((user)=>{
        res.send(user)
    }).catch((error)=>{res.send(error)})
})

app.patch('/users/:id', async (req,res)=>{
    const _id=req.params.id;
    console.log(_id)
const updates=Object.keys(req.body);
try{
const user= await User.findById(_id);
updates.forEach((update)=>{ user[update]=req.body[update]
      user.save()

    if(!user){
        res.status(404).send()
    }

})
res.send(user)
}
catch(e){
res.status(400).send()
}
})
module.exports=app