import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import FavPage from './layouts/fav.js'
import Bottom from './comp/footerComp.js'

export default function FavouritePage()
{
    return(
        <SessionProvider>
            <Top/>
            <FavPage/>
            <Bottom/>
        </SessionProvider>
    )
}