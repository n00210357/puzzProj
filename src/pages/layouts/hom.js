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
                                    placeholder
                                </h6>

                                <p className="align-items-center text-center notHov">placeholder</p>
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
