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
                </div>

                <div className="col-3">

                </div>
            </div>
        </UserContextProvider>
    )
}
