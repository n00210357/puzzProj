import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/placeholder.png'

//the user item
export default function UserItem(user){
    let image;

    if (user.image_path)
    {
        image = user.image_path;
    }
    else
    {
        image = img
    }

    return (
        <UserContextProvider>            
            <div className="card-body align-items-center text-center">
                <img src={image} alt="profile"/>
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.email}</p>
            </div>
        </UserContextProvider>
    );
}