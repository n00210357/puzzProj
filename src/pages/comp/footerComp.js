//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//displays the footer
export default function Bottom()
{
    //the footer
    return(
    <UserContextProvider>
        <footer className="container row align-items-center text-center mx-1 my-5 position-absolute bottom start-50 translate-middle">
            <div className="col-2 align-items-center text-center flex-fill">
                <button className="align-items-center text-center w-100 ms-1">
                    <a href="../home">
                        <h3>
                            Home
                        </h3>
                    </a>
                </button>
            </div>

            <div className="col-2 align-items-center text-center flex-fill">
                <button className="align-items-center text-center w-100 ms-1">
                    <a href="../create">
                        <h3>
                            Create
                        </h3>
                    </a>
                </button>
            </div>

            <div className="col-2 align-items-center text-center flex-fill">
                <button className="align-items-center text-center w-100 ms-1">
                    <a href="../search">
                        <h3>
                            Search
                        </h3>
                    </a>
                </button>
            </div>

            <div className="col-2 align-items-center text-center flex-fill">
                <button className="align-items-center text-center w-100 ms-1">
                    <a href="../users">
                        <h3>
                            Users
                        </h3>
                    </a>
                </button>
            </div>

            <div className="col-2 align-items-center text-center flex-fill">
                <button className="align-items-center text-center w-100 ms-1">
                    <a href="../bug">
                        <h3>
                            Bug report
                        </h3>
                    </a>
                </button>
            </div>

            <div className="col-2 align-items-center text-center flex-fill">
                <button className="align-items-center text-center w-100 ms-1">
                    <a href="../account">
                        <h3>
                            Account
                        </h3>
                    </a>
                </button>
            </div>
        </footer>
    </UserContextProvider>
    )
}