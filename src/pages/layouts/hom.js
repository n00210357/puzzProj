//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//the home pages
export default function HomPage()
{
    //the home page
    return(
        <UserContextProvider>
            <div className="align-items-center text-center row">
                <div className="col-3"></div>

                <div className="col-6">
                    <h3>
                        UPDATES
                    </h3>

                    <div className="ms-1 align-items-center text-center flex-fill butHov p-0 mb-3">
                        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="The most recent survey">
                            <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=e5V92hEVQkqy9Xj4R_jIes5I7qOcfq1Ni9f-_MqUtaRUMlk4OFJEMFFOV1ZURE5QTExOV0YwODVFOS4u">
                                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-newspaper me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                        <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"/>
                                        <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"/>
                                    </svg>

                                    <div className='d-flex flex-row my-0'>                                
                                        <p className='my-0 d-none d-xl-block pe-1'>
                                            User testing
                                        </p>
                                
                                        <p className='my-0 d-none d-md-block ps-1'>
                                            Survey
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </button>
                    </div>  

                    <div className="overflow-scroll">
                        <h2 className="align-items-center text-center my-3">
                            Application Version 0.2
                        </h2>

                        <h4 className="align-items-center text-center my-3">
                            New features
                        </h4>

                        <ul className="list-group list-group-flush">
                            <li className="align-items-center text-center list-group-item">
                                <h6 className="align-items-center text-center mt-3 mb-0">
                                    Crosswords
                                </h6>

                                <p className="align-items-center text-center notHov">Users can know make crosswords</p>
                            </li>

                            <li className="align-items-center text-center list-group-item">
                                <h6 className="align-items-center text-center mt-3 mb-0">
                                    UI
                                </h6>

                                <p className="align-items-center text-center notHov">Updated the UI</p>
                            </li>

                            <li className="align-items-center text-center list-group-item">
                                <h6 className="align-items-center text-center mt-3 mb-0">
                                    Account and user page updates
                                </h6>

                                <p className="align-items-center text-center notHov">Add cosule for puzzle scrolling and improve users messages speed</p>
                            </li>
                        </ul>

                        <h2 className="align-items-center text-center my-3">
                            Application Version 0.1
                        </h2>

                        <h4 className="align-items-center text-center my-3">
                            New features
                        </h4>

                        <ul className="list-group list-group-flush">
                            <li className="align-items-center text-center list-group-item">
                                <h6 className="align-items-center text-center mt-3 mb-0">
                                    accounts
                                </h6>

                                <p className="align-items-center text-center notHov">User's can create, edit and delete their account.</p>
                            </li>

                            <li className="align-items-center text-center list-group-item">
                                <h6 className="align-items-center text-center mt-3 mb-0">
                                    word searches
                                </h6>

                                <p className="align-items-center text-center notHov">User's can now create, edit, delete and solve word searches</p>
                            </li>

                            <li className="align-items-center text-center list-group-item">
                                <h6 className="align-items-center text-center mt-3 mb-0">
                                    comments
                                </h6>

                                <p className="align-items-center text-center notHov">word searches can be commented on</p>
                            </li>

                            <li className="align-items-center text-center list-group-item">
                                <h6 className="align-items-center text-center mt-3 mb-0">
                                    messages 
                                </h6>

                                <p className="align-items-center text-center notHov">Users can privatly message each other</p>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="col-3">

                </div>
            </div>
        </UserContextProvider>
    )
}
