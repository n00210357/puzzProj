//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import Bottom from './comp/footerComp.js'
import BugReport from './layouts/bug.js'

//the bugs page
export default function BugPage()
{
    return(
        <SessionProvider>
            <Top/>
            <BugReport/>
            <Bottom/>
        </SessionProvider>
    )
}