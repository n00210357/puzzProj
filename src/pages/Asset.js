import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import Bottom from './comp/footerComp.js'
import img from '../hooks/userPlaceholder.png';
import pla from '../hooks/puzzlePlaceholder.png'
//the account page
export default function Assetspage()
{
    return(
        <SessionProvider>
            <Top/>
            <h1 className='align-items-center text-center m-5'>UI assets</h1>

            <div className='my-5'>
            <h1 className='align-items-center text-center m-3'>Loading assets</h1>

                <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
                <div className='align-items-center text-center'>
                    <div className="spinner-border" role="status"/>
                </div>
            </div>

            <div className='align-items-center text-center row mx-3 my-5'>
                <h1 className='align-items-center text-center m-3'>Button assets</h1>
                
                <div className="col-2 align-items-center text-center flex-fill butHov p-0 ms-1">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Button">
                        <a href="../home">
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-0-circle-fill me-3" viewBox="0 0 16 16">
                                    <path d="M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895"/>
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.012 4.158c1.858 0 2.96-1.582 2.96-3.99V7.84c0-2.426-1.079-3.996-2.936-3.996-1.864 0-2.965 1.588-2.965 3.996v.328c0 2.42 1.09 3.99 2.941 3.99"/>
                                </svg>

                                <p className='my-0 d-none d-md-block'>
                                    Button
                                </p>
                            </div>
                        </a>
                    </button>
                </div>          

            </div>

            <div className='my-5'>
                <h1 className='align-items-center text-center m-3'>Text assets</h1>

                <div className='my-3'>
                    <h1 className='align-items-center text-center'>Title</h1>
                </div>

                <div className='my-3'>
                    <h2 className='align-items-center text-center my-3'>Subtitle</h2>
                </div>

                <div className='my-3'>
                    <h4 className='align-items-center text-center my-3'>Card title</h4>
                </div>

                <div className='my-3'>
                    <h6 className='align-items-center text-center my-3'>Small title</h6>
                </div>

                <div className='my-3'>
                    <p className='align-items-center text-center'>average text</p>
                </div>
            </div>

            <div className='my-5'>
                <h1 className='align-items-center text-center m-3'>Image assets</h1>

                <div className='my-3'>
                    <h2 className='align-items-center text-center'>Big pic</h2>

                    <div className='align-items-center text-center'>
                        <img className='rounded-1 border border-4 border-dark bigImg' src={img} alt="Big pic"/>
                    </div>
                </div>

                <div className='my-3'>
                    <h2 className='align-items-center text-center'>Small pic</h2>

                    <div className='align-items-center text-center'>
                        <img className='rounded-1 border border-4 border-dark midImg' src={img} alt="Small pic"/>
                    </div>
                </div>

                <div className='my-3'>
                    <h2 className='align-items-center text-center'>Big account pic</h2>

                    <div className='align-items-center text-center'>
                        <img className='rounded-5 border border-4 border-dark bigImg' src={img} alt="Big account pic"/>
                    </div>
                </div>

                <div className='my-3'>
                    <h2 className='align-items-center text-center'>Samll account pic</h2>

                    <div className='align-items-center text-center'>
                        <img className='rounded-5 border border-2 border-dark smalImg' src={img} alt="Samll account pic"/>
                    </div>
                </div>
            </div>

            <div className='my-5'>
                <h1 className='align-items-center text-center m-3'>Cards assets</h1>


                <div className ="border border-5 align-items-center text-center" style={{minwidth: '400px', minheight: '400px'}}>
                    <a className="align-items-center text-center p-0" href="./home">
                        <img className='rounded-1 border border-4 border-dark bigImg' src={pla} alt="Big pic"/>
                        <h6 className='align-items-center text-center my-3'>Name</h6>
                        <p className='align-items-center text-center'>Created at 00/00/00</p>
                    </a>

                    <a className="card-body align-items-center text-center p-0" href="./home">
                        <p className='align-items-center text-center'>Made by Username</p>
                    </a>
                        
                    <div className="container align-items-center text-center my-2">
                    </div>
                </div>

            </div>
            <Bottom/>
        </SessionProvider>
    )
}