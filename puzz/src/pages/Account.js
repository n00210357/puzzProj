import SessionProvider from '../contexts/userContextProvider.tsx'
import AccoPage from './comp/acco.js'
import Bottom from './comp/footerComp.js'

export default function AccountPage()
{
    return(
        <SessionProvider>
            <AccoPage/>
            <Bottom/>
        </SessionProvider>
    )
}