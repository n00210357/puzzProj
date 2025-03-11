//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import UseLayout from './layouts/use.js'
import Bottom from './comp/footerComp.js'

//the users page
export default function UserPage()
{
    return(
        <SessionProvider>
            <Top/>
            <UseLayout/>
            <Bottom/>
        </SessionProvider>
    )
}