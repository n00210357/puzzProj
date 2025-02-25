//imports
import React from 'react'
import Registor from './layouts/regis.js'
import UserContextProvider from '../contexts/userContextProvider.tsx';

//the registor page
export default function RegistorForm() {
  return (
    <UserContextProvider>
        <Registor/>
    </UserContextProvider>
  );
}