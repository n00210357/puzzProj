import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import HomPage from './layouts/hom.js'
import Bottom from './comp/footerComp.js'


export default function HomePage()
{
    return(
        <SessionProvider>
            <Top/>
            <HomPage/>
            <Bottom/>
        </SessionProvider>
    )
}