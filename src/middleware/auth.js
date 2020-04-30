const jwt= require('jsonwebtoken')
const User= require('../models/usermodel')
const auth= async (req,res,next)=>{

try{

    console.log('adding middeware')
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log('token'+token)
    const decoded = jwt.verify(token,'kalyanseckey');
   console.log('dec'+decoded )
   console.log(decoded)
    const user = await User.findOne({ _id: decoded._id,'tokens.token': token })
    console.log(user)
    req.user=user;
    req.token=token;

    next()

}
catch(e){
res.status(404).send('Please Authenticate')

}




}


module.exports=auth;