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
      <a className="card border border-4 border-dark align-items-center text-center p-3" href={url}>
        <img className='rounded-5 border border-4 border-dark bigImg' src={image} alt="Big account pic"/>
        <h4 className='align-items-center text-center my-3'>{user.username}</h4>
        <p className="align-items-center text-center notHov">{user.email}</p>
      </a>
    </UserContextProvider>
  );
}