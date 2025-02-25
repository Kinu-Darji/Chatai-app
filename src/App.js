import './App.css';
import React from 'react';
import Leftsection from './components/Leftsection';
import Rightsection from './components/Rightsection';

function App() {
  // const[message,setAllMessages]=useState([]);
  // const [history,setHistory]=useState();

  // const handleNewChat=()=>{
  //   if(message.length>0){
  //     const lastChat={id:Date.now(),title:message[0].content,message};
  //     setHistory([lastChat,...history])
  //   }
  //   setAllMessages([]);
  // }

  // const handleLoadCheat=(chatId)=>{
  //   const selectedChat = history.find((chat) => chat.id === chatId);
  //   if (selectedChat) {
  //     setAllMessages(selectedChat.messages);
  //   }
  // }
  return (
    <div className='mainpage'>
      <div className='left'>
        {/* <Leftsection history={history} onNewChat={handleNewChat} onLoadChat={handleLoadCheat}/> */}
        <Leftsection />
      </div>
      <div className='right'>
        {/* <Rightsection message={message} setAllMessages={setAllMessages}/> */}
        <Rightsection />
      </div>
    </div>
  );
}

export default App;
