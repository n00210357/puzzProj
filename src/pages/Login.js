//imports
import React from 'react'
import Login from './layouts/log.js'
import UserContextProvider from '../contexts/userContextProvider.tsx';

//the login page
export default function LoginForm() {
  return (
    <UserContextProvider>
        <Login/>
    </UserContextProvider>
  );
}