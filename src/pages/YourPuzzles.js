//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import Bottom from './comp/footerComp.js'
import UrPuzzPage from './layouts/urPuz.js'

//the puzzle page
export default function YourPuzzlePage()
{
    return(
        <SessionProvider>
            <Top/>
            <UrPuzzPage/>
            <Bottom/>
        </SessionProvider>
    )
}