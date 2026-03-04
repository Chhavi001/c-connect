import Message from "../models/message.js";
import User from "../models/user.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId=req.user._id;
    const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const getMessageByUseId=async(req,res)=>{
  try{
     const myId=req.user._id;
     const {id:userToChatId}=req.params;
      // me and you are chatting then following may be the cases
      //i send you the message
      // you send me the message
     const message=await Message.find({
      $or:[
        {senderId:myId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:myId}
      ],
     });
     res.status(200).json(message);
  }catch(error){
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

export const sendMessage=async(req,res)=>{
  try{
    const {text,image}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

    let imageUrl;
    if(image){
      //upload base64 image to cloudinary
      const uploadResponse=await cloudinary.uploader.upload(image);
      imageUrl=uploadResponse.secure_url;
    }

    const newMessage=new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl,
    });

    await newMessage.save();
    // todo: send message in real time when user is online -socket.io

    res.status(201).json(newMessage);

  }catch(error){
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({error:"Failed to send message,internal server error"});
  }
};

export const getChatPartners=async(req,res)=>{
  try{
    const loggedInUserId=req.user._id;

    //find all the messages where the logged-in user is either sender or receiver
    const messages=await Message.find({
      $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}],
    });

    const chatPartnerIds= [...newmessages.map((msg)=>{
      return msg.senderId.toString()===loggedInUserId.toString()?msg.receiverId.toString():msg.senderId.toString();
    ),];
    const chatPartners=await User.find({_id:{$in:chatPartnerIds}}).select("-password");
    
    res.status(200).json(chatPartners);
  }catch(error){
     console.error("Error in getChatPartners:",error.message);
     res.status(500).json({error:"Internal server error"});
  }
};