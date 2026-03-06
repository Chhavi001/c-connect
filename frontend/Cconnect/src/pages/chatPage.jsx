
import {useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

const ChatPage = () => {
  const {activeTab}=useAuthStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px">
      <BorderAnimatedContainer>
        {/*LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
        <ProfileHeader/>
        <ActiveTabSwitch/>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab==="chats" ?<chatsList/>:<ContactsList/>}
          
        </div>

        </div>
        {/*RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
        selectedUser?<ChatContainer/>:<No ConverstasionPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
      
    </div>
  );
};

export default ChatPage;
export {useState} from "react";