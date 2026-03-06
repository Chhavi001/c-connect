import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {ENV } from "../lib/env.js";

export const socketAuthMiddleware=async(socket,next)=>{
  try{
    //extract token from http-only cookies
    const token=socket.handshake.headers.cookie?.split(";").find((row)=>row.startsWith("jwt="))?.split("=")[1];

    if(!token){
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized: No token provided"));
    }
    //verify the token
    const decoded=jwt.verify(token,ENV.JWT_SECRET);
    const user=await User.findById(decoded.userId).select("-password");
    if(!user){
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized: Invalid token"));
    }
    //attach user info to socket object for future use
    socket.user=user;
    socket.userId=user._id.toString();
    console.log("Socket authentication successful for user:" + user.fullName + " (" + user._id + ")");
    next();
  }catch(error){
    console.error("Socket authentication error:", error);
    res.status(500).json({message:"Internal server error"});
  }
};