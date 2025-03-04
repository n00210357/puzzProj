//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import Bottom from './comp/footerComp.js'
import PuzEditPage from './layouts/puzEdit.js'

//the puzzle page
export default function EditPuzzlePage()
{
    return(
        <SessionProvider>
            <Top/>
            <PuzEditPage/>
            <Bottom/>
        </SessionProvider>
    )
}