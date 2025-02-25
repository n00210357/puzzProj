//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/placeholder.png'

//the message item
export default function MessageItem(message){
    //sets up the image
    let image;

    if (message.image_path)
    {
        image = message.image_path;
    }
    else
    {
        image = img
    }

    //displays your account
    return (
        <UserContextProvider>            
            <div className="card-body align-items-center text-center">
                <img src={image} alt="profile"/>
                <h5 className="card-title">{message.username}</h5>
                <p className="card-text">{message.email}</p>
            </div>
        </UserContextProvider>
    );
}