//use client
"use client";

//imports
import SessionProvider from './contexts/userContextProvider.tsx'
import StartForm from './pages/layouts/start.js';
import React from "react"
import './css/main.css';

//the app
function App() {
  //cors
  const cors = require('cors');
  cors();

  return (
    <SessionProvider>
      <StartForm/>
    </SessionProvider>
  );
}

//exports the app
export default App;
