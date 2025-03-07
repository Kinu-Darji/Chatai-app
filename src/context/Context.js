import React, { createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addMessageToChat } from "../redux/chatSlice";

export const chatContext = createContext(); 

const API_KEY = "AIzaSyDHrDcvcDKhRvPbJ3pGJ2xJTwVaugSBPiM";

const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false);

  async function generateAnswer() {
    if (!message.trim()) return;
  
    setDisable(true);
    const userMessage = { sender: "You", message };
    setMessage("");
  
    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: message }] }] }
      );

      let aiText = "No response from AI.";
      if (response.data.candidates && response.data.candidates.length > 0) {
        aiText = response.data.candidates[0].content.parts[0].text || aiText;
      }
  
     
      let formattedText = aiText
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g,"<b><strong>$1</strong></b>")
      .replace(/\*/g,"&bull;");

     
  
      const aiMessage = { sender: "AI", message: formattedText };
  
      dispatch(addMessageToChat({ chatId: activeChatId, message: formattedText, sender: "AI" }));
  
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  
    setDisable(false);
  }
  

  return (
    <chatContext.Provider value={{ message, setMessage, disable, generateAnswer }}>
      {children}
    </chatContext.Provider>
  );
};

export default ContextProvider;
