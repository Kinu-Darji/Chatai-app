  import React, { useState } from "react";
  import "../styles/Rightsection.css";
  import axios from "axios";

  const API_KEY = "AIzaSyDHrDcvcDKhRvPbJ3pGJ2xJTwVaugSBPiM";

  const Rightsection = () => {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [disable,setDisable]=useState(false);
    

    async function generateAnswer() {
      if (!message.trim()) return;

      setDisable(true);
      const userMessage = { role: "user", content: message };
      setAllMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          { contents: [{ parts: [{ text: message }] }] }
        );

        let aiText = "No response from AI.";
        if (response.data.candidates && response.data.candidates.length > 0) {
          aiText = response.data.candidates[0].content.parts[0].text || aiText;
        }
        
        
        let formattedText = aiText
        .replace(/\*\*(.*?)\*\*/g, "<b><strong>$1</strong></b>") 
        .replace(/\*/g, "&bull;") 
        .replace(/\n/g, "<br>"); 
        

        const aiMessage = { role: "ai", content: formattedText };
        // const aiMessage = { role: "ai", content: aiText };
        setAllMessages((prevMessages) => [...prevMessages, aiMessage]);

        

      } catch (error) {
        console.error("Error fetching response:", error);
        setAllMessages((prevMessages) => [
          ...prevMessages,
          { role: "ai", content: "Error: Could not fetch AI response." },
        ]);
      }
      setMessage("");
      setDisable(false)
    }

    return (
      <div className="rightsection">
        <div className="nochat">
          {allMessages.length > 0 ? (
            <div className="messages">
              {allMessages.map((msg, index) => (
                <div key={index} className="message">
                  <div className="details">
                    <h2>{msg.role === "user" ? "You :" : "AI :"}</h2>
                    <p dangerouslySetInnerHTML={{ __html: msg.content }}></p>
                    {/* <p>{msg.content}</p> */}
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
                  if (e.key === "Enter" ) generateAnswer();
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
                onClick={generateAnswer}
                style={{ cursor: "pointer" }}
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
