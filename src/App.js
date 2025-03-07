import './App.css';
import React from 'react';
import Leftsection from './components/Leftsection';
import Rightsection from './components/Rightsection';

function App() {

  return (
    <div className='mainpage'>
      <div className='left'>
        <Leftsection />
      </div>
      <div className='right'>       
        <Rightsection />
      </div>
    </div>
  );
}

export default App;
