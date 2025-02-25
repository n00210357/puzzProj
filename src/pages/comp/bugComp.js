//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//the bug item
export default function BugItem(bug){

    //displays your account
    return (
        <UserContextProvider>            
            <div className="card-body align-items-center text-center">
                <h5 className="card-title">Reported by {bug.user_id}</h5>
                <p className="card-text">{bug.text}</p>
                <p className="card-text">At {bug.createdAt}</p>
                <h5 className="card-text">Has bug been fixed {bug.fixed}</h5>
            </div>
        </UserContextProvider>
    );
}