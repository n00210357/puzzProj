//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/userPlaceholder.png'

//the user item
export default function UserItem(user){
  //sets up image
  let image;

  if (user.image_path && user.image_path !== null && user.image_path !== undefined)
  {
    image = `http://api-image.s3.eu-west-1.amazonaws.com/${user.image_path}`;
  }
  else
  {
    image = img
  }

  //creates the urls
  const url = `use/${user._id}`

  //displays your account
  return (
    <UserContextProvider>            
      <a className="card-body align-items-center text-center p-0" href={url}>
        <img src={image} alt="profile"/>
        <h5 className="card-title">{user.username}</h5>
        <p className="card-text">{user.email}</p>
      </a>
      </UserContextProvider>
  );
}