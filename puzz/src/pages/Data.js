import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'

import Bottom from './comp/footerComp.js'


export default function DataPage()
{
    return(
        <SessionProvider>
            <Top/>

            <Bottom/>
        </SessionProvider>
    )
}