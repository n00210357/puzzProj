import React from 'react'
import Registor from './comp/regis.js'
import UserContextProvider from '../contexts/userContextProvider.tsx';

function RegistorForm() {
  return (
    <UserContextProvider>
        <Registor/>
    </UserContextProvider>
  );
}

export default RegistorForm;