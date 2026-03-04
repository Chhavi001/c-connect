import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

import User from "../models/User.js";
import bcrypt from "bcryptjs";

import "dotenv/config";
export const signup=async(req,res)=>{
  const {fullName,email,password}=req.body
  

  try{
    if(!fullName || !email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    if(password.length<6){
      return res.status(400).json({message:"Password must be at least 6 characters"})
    }

    //check if emails valid:regex
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message:"Invalid email format"})
    }

  const user=await User.findOne({email:email}) 
  if(user) return res.status(400).json({message:"Email already exits"})

    //123456 => $2b$10$EixZa
    const salt=await bcrypt.genSalt(10)  //length of the password should be 
    const hashedPassword=await bcrypt.hash(password,salt)
    const  newUser=new User({
      fullName,
      email,
      password:hashedPassword
    })

    if(newUser){
      // before CR:
      // generateToken(newUser._id,res);
      // await newUser.save();
      // after CR:
      //persist user first, then issue auth cookie
      const savedUser=await newUser.save();
      generateToken(savedUser._id,res);

      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic,
      });
     // todo: send a welcome email to the user

     try{
      await sendWelcomeEmail(savedUser.email,savedUser.fullName,process.env.CLIENT_URL);
     }catch(error){
       console.error("Failed to send welcome email:",error);
     }
    }else{
      res.status(400).json({message:"Invalid user data"})
    }
  }catch(error){
    console.log("Error in signup controller:",error);
    res.status(500).json({message:"Internal server error"})
   
  }
}

export const login=async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({message:"Email and password are required"});
  }

  try{
  const user=await User.findOne({email})
  if(!user) return res.status(400).json({message:"Invalid credentials"})
    //never tell user which one is wrong email or password for security reasons

  const isPasswordCorrect=await bcrypt.compare(password,user.password)
  if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"});
  generateToken(user._id,res);
  res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    profilePic:user.profilePic,
  });

  }catch(error){
    console.error("Error in login controller:",error);
    res.status(500).json({message:"Internal server error"});
  }
};


export const logout=(_,res)=>{
  res.cookie("jwt","",{maxAge:0});
  res.status(200).json({message:"Logged out successfully"});
};

export const updateProfile=async(req,res)=>{
  try{
    const { profilePic}=req.body;
    if(!profilePic) return res.status(400).json({message:"Profile picture is required"});
    const userId=req.user._id;

    const uploadedResponse=await cloudinary.uploader.upload(profilePic)
    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadedResponse.secure_url},{new:true});
    res.status(200).json(updatedUser)
  }catch(error){ 
    console.error("Error in updateProfile :",error);
    res.status(500).json({message:"Internal server error"});
  }
}