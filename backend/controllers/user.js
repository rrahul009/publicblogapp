const userModel = require("../models/user");
// const CryptoJS = require("crypto-js");
const bcrypt=require('bcrypt')
 
exports.userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    console.log(name,email,password,confirmpassword)
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        message: "All field are required",
      });
    }
  
    const userData = await userModel.findOne({ email });
   
    if (userData) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "password and confirmpassword not matched",
      });
    }
    // const ciphertext = CryptoJS.AES.encrypt(password, 'process.env.CRYPTO_SECRET').toString()
    const ciphertext=await bcrypt.hash(password,10)
    const newUser = new userModel({
      name,
      email,
      password:ciphertext
    });
    const saveduser=  await newUser.save()
    res.status(201).json({
      message: "user register successfully",
      data: saveduser,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
exports.userLogin= async(req,res)=>{
   const{email,password}=req.body
  try {
    const user=await userModel.findOne({email})
    if(!user)
    {
      return res.status(401).json({
        message:'invalid email or password'
      })
    }
    const passwordMatched=await bcrypt.compare(password,user.password)
    if(passwordMatched)
    {
      return res.status(200).json({
        message:"login success",
        data:user
      })
    }
    else{
      return res.status(401).json({
        message:"invalid email or password"
      })
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:"internal server error"
    })
    
  }



}
