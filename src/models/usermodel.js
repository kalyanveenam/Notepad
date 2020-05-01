const bcryptjs=require('bcryptjs')
const mongoose=require('../db/mongoose')
const jwt= require('jsonwebtoken')
const userSchema=mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokens:[
    {
    token:{
      type: String,
      required: true
    }
  }]
})
// middleware to hash password 
userSchema.pre('save',async function(next){
const user=this;
if(user.isModified('password')){
user.password= await bcryptjs.hash(user.password,8)
}
next()
})
//to login
userSchema.statics.getCredentials= async (email, password)=>{
const user = await User.findOne({email})
if(user){
  
 const isMatch= bcryptjs.compare(password,user.password)
 if(!isMatch){
throw new error('Ivalid credentials');

  }
 }
  return user;

}
// to generate token
userSchema.methods.generateToken = async function (){
  const user = this;
  console.log("test=>" + user);
  console.log(user);
  const token = jwt.sign({ _id: user._id.toString() }, "kalyanseckey");
   console.log("token"+token);
    user.tokens=user.tokens.concat({token});
    await user.save()

  return token;
};
userSchema.methods.getPublicProfile =  function(){
    const user = this;
 const userObject= user.toObject()
 console.log('user obj');

  delete userObject.password;
  delete userObject.tokens;
  console.log(userObject)
  return userObject;
}
userSchema.virtual('notes', {

  ref:'Note',
  localField:'_id',
  foreignField:'owner'

})


const User=mongoose.model('User',userSchema)
    
    
  module.exports=User