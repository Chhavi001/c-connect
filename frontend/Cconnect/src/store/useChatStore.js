import {create} from "zustand";
export const useChatStore=create((set,get)=>({
  allContacts:[],
  Chats:[],
  messages:[],
  activeTab:"chats",
  selectedUser:null,
  isUsersLoading:false,
  isMessagesLoading:false,
  isSoundEnabled:JSON.parse(localStorage.getItem("soundEnabled"))==="true" 
  toggleSound:()=>{
    localStorage.setItem("isSoundEnabled)");
    set({isSoundEnabled:!get().isSoundEnabled});
  },
  setActiveTab:(tab)=>{set({activeTab:tab}),
  setSelectedUser:(selectedUser)=>({selectedUser}),

  getAllContacts:async()=>{
    set({isUsersLoading:true});
    try{
      const res=await axiosInstance.get("/messages/contacts");
      set({allContacts:res.data});
    }catch(error){
      Toast.error(error.response.data.message);
    }finally{
      set({isUsersLoading:false});
    }
  },
  getMyChatPartners:async()=>{
    set({isUsersLoading:true});
    try{
      const res=await axiosInstance.get("/messages/my-chats");
      set({Chats:res.data});
    }catch(error){
      Toast.error(error.response.data.message);
    }finally{
      set({isUsersLoading:false});
    }
  },

  getMessagesByUserId:async(userId)=>{

    set({isMessagesLoading:true});
    try{
      const res=await axiosInstance.get(`/messages/${userId}`);
      set({messages:res.data});
    }catch(error){
      Toast.error(error.response?.data?.message || "Something went wrong");
    }finally{
      set({isMessagesLoading:false});
    }
  },

  sendMessage:async(messageData)=>{
    const {selectedUser,messages}=get();
    const {authUser}=useAuthStore.getState();
    const tempId='temp-${Date.now()}'
    const optimisticMessage={
      _id:tempId,
      senderId:authUser._id,
      receiverId:selectedUser._id,
      text:messageData.text,
      image:messageData.image,
      createdAt:new Date().toISOString(),
      isOptimistic:true,
    };
    //immediately update the UI by sending the message 
    set({messages:[...messages,optimisticMessage]});

    try{
      const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
      set({messages:[...messages,res.data]});
    }catch(error){
      //removing optimistic message on failure 
      set({messages:messages});
      Toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
}));