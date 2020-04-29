const express= require('express')
const User=require('../src/models/usermodel')
const auth=require('../src/middleware/auth')
//const router=express.Router()
const app=express()
app.use(express.json())
app.get('/users/me',auth, async (req,res)=>{

res.send(req.user)

//    await User.find({}).then((User)=>{
//         res.send(User);
//          }).catch((error)=>{
//         res.send(error)
//          })
})
app.post('/users/login', async (req,res)=>{
    try{
    const getuser= await User.getCredentials(req.body.email, req.body.password)
    console.log('getuser')
    console.log(getuser)
   const token=await getuser.generateToken();
     res.send({getuser, token})
    }
    catch(e){
res.status(404).send()
    }
    })
app.post('/users', async (req,res)=>{
    const reqbody=req.body
 try{
    const user1= new User(reqbody)
       await user1.save()
      const token= await user1.generateToken()
    res.send({user1,token}) 
 }
 catch(e){
     res.status(404).send()
 }
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