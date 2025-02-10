import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import AccoPage from './layouts/acco.js'
import Bottom from './comp/footerComp.js'

export default function AccountPage()
{
    return(
        <SessionProvider>
            <Top/>
            <AccoPage/>
            <Bottom/>
        </SessionProvider>
    )
}