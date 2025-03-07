import { createSlice } from "@reduxjs/toolkit";

let chatCounter = 1; 

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [{ id: 1, title: "Chat 1", history: [] }],
    activeChatId: 1,
  },
  reducers: {
    addChat: (state) => {
      const newChat = {
        id: ++chatCounter,
        title: `Chat ${state.chats.length + 1}`,
        history: [],
      };
      state.chats.push(newChat);
      state.activeChatId = newChat.id; 
    },
    setActiveChat: (state, action) => {
      state.activeChatId = action.payload;
    },
    addMessageToChat: (state, action) => {
      const { chatId, message, sender } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);

      if (chat) {
        chat.history.push({ sender, message });
        if (chat.title.startsWith("Chat ")) {
           chat.title = message;
         }
      }
    },
     deleteChat:(state,action)=>{
       state.chats=state.chats.filter((chat)=>chat.id!==action.payload)
        if(state.activeChatId===action.payload){
          state.activeChatId=state.chats.length>0?state.chats[0].id:null;
        }
      },
    
    
  },
});

export const { addChat, setActiveChat, addMessageToChat,deleteChat} = chatSlice.actions;
export default chatSlice.reducer;
