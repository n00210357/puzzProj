import SessionProvider from '../contexts/userContextProvider.tsx'
import HomPage from './comp/hom.js'
import Bottom from './comp/footerComp.js'

export default function HomePage()
{
    return(
        <SessionProvider>
            <HomPage/>
            <Bottom/>
        </SessionProvider>
    )
}