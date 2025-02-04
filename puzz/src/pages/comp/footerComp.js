
import UserContextProvider from "../../contexts/userContextProvider.tsx";

export default function Bottom()
{
    //the footer
    return(
    <UserContextProvider>
        <footer className="row align-items-end">
            <button id="clickMe" className="col justify-content-end" value="HOMES" type="button">
                <h3 className="but2">
                    Home
                </h3>
            </button>

            <button id="clickMe" className="col justify-content-end" value="CREATORS" type="button">
                <h3 className="but2">
                    Creator
                </h3>
            </button>

            <button id="clickMe" className="col justify-content-end" value="SEARCH" type="button">
                <h3 className="but2">
                    Search
                </h3>
            </button>

            <button id="clickMe" className="col justify-content-end" value="FAVOURITES" type="button">
                <h3 className="but2">
                    Favourites
                </h3>
            </button>

            <button className="col">
                    <a href="../account">
                        <h3 className="but">
                            Account
                        </h3>
                    </a>
            </button>
        </footer>
    </UserContextProvider>
    )
}