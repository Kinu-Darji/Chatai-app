import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat, addChat, deleteChat } from "../redux/chatSlice";
import user_logo from "../assets/user_logo.jpg";
import "../styles/Leftsection.css";
import Alert from "./Alert";

const Leftsection = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);

  const [showAlert, setShowAlert] = useState(false);
  const [chatDelete, setChatDelete] = useState(null);

  const alertRef = useRef(null);

  const handleClickDelete = (chatId) => {
    setChatDelete(chatId);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    if (chatDelete) {
      dispatch(deleteChat(chatDelete));
    }
    setShowAlert(false);
  };

  //setShowAlert(false);

  return (
    <div className="leftsection">
      <div className="newchat">
        <button className="button" onClick={() => dispatch(addChat())}>
          New Chat
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <div className="recent">Recent Chats</div>
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="chat-item"
              onClick={() => dispatch(setActiveChat(chat.id))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="msgicon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="deleteicon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickDelete(chat.id);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      <div className="user-container">
        <img src={user_logo} alt="User" width={40} height={40} />
        <p className="text1">User</p>
      </div>

      {showAlert && (
        <div ref={alertRef}>
          <Alert
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Leftsection;
