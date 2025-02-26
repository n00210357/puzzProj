//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//the reply item
export default function ReplyItem(reply){
    //sets up the image
    let image;

    if (reply.image_path)
    {
        image = reply.image_path;
    }
    else
    {
        image = null
    }

    //displays your account
    return (
        <UserContextProvider>            
            <div className="card-body align-items-center text-center">
                <img src={image} alt="profile"/>
                <h5 className="card-title">{reply.username}</h5>
                <p className="card-text">{reply.text}</p>
            </div>
        </UserContextProvider>
    );
}