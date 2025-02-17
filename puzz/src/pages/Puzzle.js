import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import PuzPage from './layouts/puz.js'
import Bottom from './comp/footerComp.js'


export default function puzzlePage()
{
    return(
        <SessionProvider>
            <Top/>
            <PuzPage/>
            <Bottom/>
        </SessionProvider>
    )
}