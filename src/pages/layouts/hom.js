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

                    <h4>
                        Application Version 0.1
                    </h4>

                    <h5 className="align-items-center text-center">
                        Features
                    </h5>

                    <ul className="list-group list-group-flush">
                        <li className="align-items-center text-center list-group-item">
                            <h5 className="align-items-center text-center my-0">
                                accounts
                            </h5>

                            <p className="my-1">User's can create, edit and delete their account.</p>
                        </li>

                        <li className="align-items-center text-center list-group-item">
                            <h5 className="align-items-center text-center my-0">
                                word searches
                            </h5>
                            <p className="my-1">User's can know create, edit, delete and solve word searches</p>
                        </li>

                        <li className="align-items-center text-center list-group-item">
                            <h5 className="align-items-center text-center my-0">
                                comments
                            </h5>
                            <p className="my-1">wordsearch's can be commented on</p>
                        </li>

                        <li className="align-items-center text-center list-group-item">
                            <h5 className="align-items-center text-center my-0">
                                messages 
                            </h5>
                            <p className="my-1">Users can privatly message each other</p>
                        </li>
                    </ul>
                </div>

                <div className="col-3">

                </div>
            </div>
        </UserContextProvider>
    )
}
