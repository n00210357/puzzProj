//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import CreFinPage from './layouts/crefin.js'
import Bottom from './comp/footerComp.js'

//the create finalize page
export default function CreateFinalize()
{
    return(
        <SessionProvider>
            <Top/>
            <CreFinPage/>
            <Bottom/>
        </SessionProvider>
    )
}