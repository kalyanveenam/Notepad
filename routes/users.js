const express= require('express')
const router=express.Router()

router.get('/users',(req,res)=>{
    res.render('login')
})
router.get('/',(req,res)=>{
    res.send('namaste')
})
module.exports=router