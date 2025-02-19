import React from 'react'
import Login from './layouts/log.js'
import UserContextProvider from '../contexts/userContextProvider.tsx';

function LoginForm() {
  return (
    <UserContextProvider>
        <Login/>
    </UserContextProvider>
  );
}

export default LoginForm;