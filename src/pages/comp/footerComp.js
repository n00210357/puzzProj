//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//displays the footer
export default function Bottom()
{
    //the footer
    return(
    <UserContextProvider>
        <footer className="container row align-items-center text-center mx-1 my-5 position-absolute bottom start-50 translate-middle">
        <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Home page">
                    <a href="../home">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door-fill me-md-3" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Home
                            </p>
                        </div>
                    </a>
                </button>
            </div>    
            </div>

            <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Create a puzzle">
                    <a href="../create">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-screwdriver me-md-3" viewBox="0 0 16 16">
                                <path d="M0 .995.995 0l3.064 2.19a1 1 0 0 1 .417.809v.07c0 .264.105.517.291.704l5.677 5.676.909-.303a1 1 0 0 1 1.018.24l3.338 3.339a.995.995 0 0 1 0 1.406L14.13 15.71a.995.995 0 0 1-1.406 0l-3.337-3.34a1 1 0 0 1-.24-1.018l.302-.909-5.676-5.677a1 1 0 0 0-.704-.291H3a1 1 0 0 1-.81-.417zm11.293 9.595a.497.497 0 1 0-.703.703l2.984 2.984a.497.497 0 0 0 .703-.703z"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Create
                            </p>
                        </div>
                    </a>
                </button>
            </div>   
            </div>

            <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Search through puzzles">
                    <a href="../search">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search me-md-3" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Search
                            </p>
                        </div>
                    </a>
                </button>
            </div>   
            </div>

            <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Look for users">
                    <a href="../users">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill me-md-3" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Users
                            </p>
                        </div>
                    </a>
                </button>
            </div>   
            </div>

            <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Report a bug">
                    <a href="../bug">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bug-fill me-md-3" viewBox="0 0 16 16">
                                <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"/>
                                <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"/>
                            </svg>

                            <div className='d-flex flex-row my-0'>                                
                                <p className='my-0 d-none d-md-block pe-1'>
                                    report
                                </p>
                                

                                <p className='my-0 d-none d-xl-block ps-1'>
                                    bug
                                </p>
                            </div>
                        </div>
                    </a>
                </button>
            </div>   
            </div>

            <div className="col-2">
                <div className="align-items-center text-center flex-fill butHov p-0">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Your account">
                        <a href="../account">
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle me-md-3" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>

                                <p className='my-0 d-none d-md-block'>
                                    Account
                                </p>
                            </div>
                        </a>
                    </button>
                </div>  
            </div>
        </footer>
    </UserContextProvider>
    )
}