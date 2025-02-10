import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import SeaPage from './layouts/sea.js'
import Bottom from './comp/footerComp.js'

export default function SearchPage()
{
    return(
        <SessionProvider>
            <Top/>
            <SeaPage/>
            <Bottom/>
        </SessionProvider>
    )
}