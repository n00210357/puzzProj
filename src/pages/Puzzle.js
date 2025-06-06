//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import PuzPage from './layouts/puz.js'
import Bottom from './comp/footerComp.js'

//the puzzle page
export default function PuzzlePage()
{
    return(
        <SessionProvider>
            <Top/>
            <PuzPage/>
            <Bottom/>
        </SessionProvider>
    )
}