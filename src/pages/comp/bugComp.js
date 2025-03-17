//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx"
import img from '../../hooks/userPlaceholder.png'

//the bug item       
export default function BugItem(bug, users, id, fillPopUpEdit, destroy){
    //sets up the image
    let image = null;
    let user = null;
    let userImage = null;

    if (image === null)
    {
        if (bug.image_path && bug.image_path !== null && bug.image_path !== undefined)
        {
          image = `http://api-image.s3.eu-west-1.amazonaws.com/${bug.image_path}`;
        }
        else
        {
          image = null
        }
    }

    if (user === null)
    {
        for(let i = 0; i < users.length; i++)
        {
            if (bug.user_id === users[i]._id)
            {
              user = users[i];
              break;
            }
        }
    }  

    if (userImage === null && user !== null)
    {
        if (user.image_path && user.image_path !== null && user.image_path !== undefined)
        {
            if (user.image_path.charAt(0) === "h" && user.image_path.charAt(1) === "t" && user.image_path.charAt(2) === "t" && user.image_path.charAt(3) === "p")
            {
                userImage = user.image_path;
            }
            else
            {
                userImage = `http://api-image.s3.eu-west-1.amazonaws.com/${user.image_path}`;
            }
        }
        else
        {
          userImage = img
        }
    }

    function editorForm()
    {
      fillPopUpEdit(bug)
    }
    
    //warns user of deleting their bug
    function warn() 
    {
      if (window.confirm("Are you sure you want to DELETE your bug")) 
      {
        destroy(bug)
      } 
    }   

    let solved = "";

    if (bug.fixed === true)
    {
        solved = "Solved"
    }
    else
    {
        solved = "Unsolved"
    }

    //displays the bug
    if (user !== null && userImage !== null && user._id === id)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <h3>{solved}</h3>
                    <div className="d-flex flex-row position-relative my-3">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{user.username}</p>

                        <div className="d-flex flex-row position-absolute end-0">
                            <p className="mx-2 mt-2" onClick={editorForm}>Edit</p>
                            <p className="mx-2 mt-2" onClick={warn}>Delete</p>
                        </div>
                    </div>

                    <img style={{maxwidth: '100px', maxheight: '100px', width:'100%', height: 'auto'}} src={image} alt=""/>
                    <p className="card-text my-3">{bug.text}</p>
                </div>
            </UserContextProvider>
        );
    }
    else if (user !== null && userImage !== null)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <h3>{solved}</h3>

                    <div className="d-flex flex-row position-relative">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{user.username}</p>
                    </div>

                    <img style={{maxwidth: '200px', maxheight: '200px', width:'100%', height: 'auto'}} src={image} alt=""/>
                    <p className="card-text">{bug.text}</p>
                </div>
            </UserContextProvider>
        );
    }
}