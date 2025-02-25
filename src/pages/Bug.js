//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import Bottom from './comp/footerComp.js'

//the bugs page
export default function BugPage()
{
    return(
        <SessionProvider>
            <Top/>

            <Bottom/>
        </SessionProvider>
    )
}