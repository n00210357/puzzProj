import React from 'react'
import UserContextProvider from '../../contexts/userContextProvider.tsx';
import Top from '../comp/headerComp.js'
import AccoEdit from '../layouts/accoEdit.js'
import Bottom from '../comp/footerComp.js'

function AccountEdit() {
  return (
    <UserContextProvider>
      <Top/>
      <AccoEdit/>
      <Bottom/>
    </UserContextProvider>
  );
}

export default AccountEdit;