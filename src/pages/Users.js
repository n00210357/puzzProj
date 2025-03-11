//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import UsersLayout from './layouts/users.js'
import Bottom from './comp/footerComp.js'

//the users page
export default function UsersPage()
{
    return(
        <SessionProvider>
            <Top/>
            <UsersLayout/>
            <Bottom/>
        </SessionProvider>
    )
}