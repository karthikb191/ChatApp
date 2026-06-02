//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './Css/App.css'
import ChatPage from './Components/ChatPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';

function TestApp()
{



  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )

}

/*
TODOS:

- Build Login Page UI. Find some good references to use
- Invoke a call to server and wait display response 
- Build Chat page

*/


export {TestApp}
