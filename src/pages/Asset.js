import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'

import Bottom from './comp/footerComp.js'

//the account page
export default function Assetspage()
{
    return(
        <SessionProvider>
            <Top/>
            <div className='align-items-center text-center row mx-3'>
                
                <div className="col-2 align-items-center text-center flex-fill butHov">
                    <button className="align-items-center text-center w-100 ms-1 rounded-1 border border-4 border-dark">
                        <a href="../home">
                            <div className='fw-bolder d-flex flex-row justify-content-center my-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-0-circle-fill me-3" viewBox="0 0 16 16">
                                    <path d="M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895"/>
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.012 4.158c1.858 0 2.96-1.582 2.96-3.99V7.84c0-2.426-1.079-3.996-2.936-3.996-1.864 0-2.965 1.588-2.965 3.996v.328c0 2.42 1.09 3.99 2.941 3.99"/>
                                </svg>

                                <p className='my-0'>
                                    Button
                                </p>
                            </div>
                        </a>
                    </button>
                </div>          

            </div>
            <Bottom/>
        </SessionProvider>
    )
}