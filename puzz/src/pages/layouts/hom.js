import UserContextProvider from "../../contexts/userContextProvider.tsx";

export default function HomPage()
{
    //the home page
    return(
        <UserContextProvider>
            <div className="align-items-center text-center">
                <h3>
                    UPDATES
                </h3>

                <h4>
                    Application Version 0.0
                </h4>
            </div>
        </UserContextProvider>
    )
}
