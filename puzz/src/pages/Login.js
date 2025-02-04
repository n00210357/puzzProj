import React from 'react'
import Login from './comp/log.js'
import UserContextProvider from '../contexts/userContextProvider.tsx';

function RegistorForm() {
  return (
    <UserContextProvider>
        <Login/>
    </UserContextProvider>
  );
}

export default RegistorForm;