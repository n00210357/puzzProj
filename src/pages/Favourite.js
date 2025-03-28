//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'

import Bottom from './comp/footerComp.js'

//the favourites page
export default function FavouritePage()
{
    return(
        <SessionProvider>
            <Top/>

            <Bottom/>
        </SessionProvider>
    )
}