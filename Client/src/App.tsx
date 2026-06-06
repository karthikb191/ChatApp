//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './Css/App.css'
import ChatPage from './Components/ChatPage';

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import SignupPage from './Components/Pages/SignupPage';
import {authContext, useAuthContext} from './Store/authContext';

function TestApp()
{
  const {isCheckingAuth, checkAuth} = useAuthContext();

  //Try to authenticate user as soon as we are in this page
  useEffect(()=>{
    console.log("Checking auth at the start of the application");
    authContext.CheckAuth();
  }, [checkAuth])

  if(isCheckingAuth)
  {
    return (
      <>
        <h1 className="centerAlign"> Logging IN </h1>
      </>
    )
  }
  else
  {
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
        </BrowserRouter>
      </>
    )
  }

}

/*
TODOS:

- Build Login Page UI. Find some good references to use
- Invoke a call to server and wait display response 
- Build Chat page

*/


export {TestApp}
