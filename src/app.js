const express= require('express')
const path= require('path')
const app=express()
const usersroutes=require('../routes/users')
const taskroutes=require('../routes/notes')
console.log('dirname---->'+__dirname)
const indexpath= path.join(__dirname, '../public/html/')
console.log(indexpath)
app.set('view engine', 'hbs')
app.use(usersroutes)
app.use(taskroutes)
app.use('/static',express.static('public'))
app.get('/',(req,res)=>{
res.sendFile(indexpath + 'home.html')
})
app.get('/notespage',(req,res)=>{
    res.sendFile(indexpath + 'note.html')
})
app.get('/signup',(req,res)=>{
    res.sendFile(indexpath + 'signup.html')
})

app.listen('8000',console.log('app is up and running'))
