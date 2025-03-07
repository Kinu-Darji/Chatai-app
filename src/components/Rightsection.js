import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatContext } from "../context/Context";
import { addMessageToChat } from "../redux/chatSlice";
import "../styles/Rightsection.css";

const Rightsection = () => {
  const dispatch = useDispatch();
  const { message, setMessage, disable, generateAnswer } = useContext(chatContext);
  
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const chats = useSelector((state) => state.chat.chats);
  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const chatHistory = activeChat?.history || [];

  const handleSend = () => {
    if(!activeChatId)return;
    dispatch(addMessageToChat({ chatId: activeChatId, message, sender: "You" }));
    generateAnswer(); 
  };

  return (
    <div className="rightsection">
      <div className="nochat">     
        
           {chatHistory.length > 0 ? (
          <div className="messages">
            {chatHistory.map((msg, index) => (
              <div key={index} className="message">
                <div className="details">
                  <h2>{msg.sender === "You" ? "You:" : "AI:"}</h2>
                  <p dangerouslySetInnerHTML={{ __html: msg.message }}></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="h1">How Can I Help You?</h1>
          </div>
        )}

        <div className="bottom">
          <div className="msgbar">
            <input
              className="input"
              type="text"
              placeholder="Ask Anything"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim()) handleSend();
              }}
              disabled={disable}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={handleSend}
              style={{ cursor: disable ? "not-allowed" : "pointer", opacity: disable ? 0.5 : 1 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightsection;
