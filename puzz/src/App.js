"use client";

import SessionProvider from './contexts/userContextProvider.tsx'
import StartForm from './pages/layouts/start.js';
import React from "react"
import './css/main.css';

function App() {

  return (
    <SessionProvider>
      <StartForm/>
    </SessionProvider>
  );
}

export default App;
