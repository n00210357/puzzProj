//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import CrePage from './layouts/cre.js'
import Bottom from './comp/footerComp.js'

//the create page
export default function CreatePage()
{
    return(
        <SessionProvider>
            <Top/>
            <CrePage/>
            <Bottom/>
        </SessionProvider>
    )
}