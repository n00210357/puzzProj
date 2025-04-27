//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx"
import img from '../../hooks/userPlaceholder.png'

//the reply item
export function RepItem(rep, users, id, fillPopUpEdit, destroy){
    //sets up the image
    let image = null;
    let user = null;
    let userImage = null;

    if (image === null)
    {
        if (rep.image_path && rep.image_path !== null && rep.image_path !== undefined)
        {
            image = `http://api-image.s3.eu-west-1.amazonaws.com/${rep.image_path}`;
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
            if (rep.user_id === users[i]._id)
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
          userImage = `http://api-image.s3.eu-west-1.amazonaws.com/${user.image_path}`;
        }
        else
        {
          userImage = img
        }
    }

    function editor()
    {
      fillPopUpEdit(rep)
    }

    //warns user of deleting their reply
    function warn() 
    {
      if (window.confirm("Are you sure you want to DELETE your comment")) 
      {
        destroy(rep)
      } 
    }   

    //displays the reply
    if (user !== null && userImage !== null && user._id === id && image === null)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center rounded-1 border border-4 border-dark m-3 position-relative">
                    <div className="d-flex flex-row position-relative">
                        <img className='rounded-5 border border-2 border-dark smalImg mx-2 mt-2' src={userImage} alt="Samll account pic"/>
                        <p className='align-items-center text-center notHov'>{user.username}</p>
                    </div>
        
        
                    <div className="mb-2 position-relative">
                        <div className="position-relative d-flex flex-row">
                            <p className='mx-2 mt-2 align-items-center text-center react notHov' onClick={editor}>Edit</p>
                            <p className='mx-2 mt-2 align-items-center text-center react notHov' onClick={warn}>Delete</p>
                        </div>
                    </div>
        
                    <p className='align-items-center text-center notHov'>{rep.text}</p>
                </div>
            </UserContextProvider>
        );
    }
    else if (user !== null && userImage !== null && image === null)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center rounded-1 border border-4 border-dark m-3 position-relative">
                    <div className="d-flex flex-row position-relative">
                        <img className='rounded-5 border border-2 border-dark smalImg mx-2 mt-2' src={userImage} alt="Samll account pic"/>
                        <p className='align-items-center text-center notHov'>{user.username}</p>
                    </div>
        
                    <p className='align-items-center text-center notHov'>{rep.text}</p>
                </div>
            </UserContextProvider>
        );
    }

    if (user !== null && userImage !== null && user._id === id)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center rounded-1 border border-4 border-dark m-3 position-relative">
                    <div className="d-flex flex-row position-relative">
                        <img className='rounded-5 border border-2 border-dark smalImg mx-2 mt-2' src={userImage} alt="Samll account pic"/>
                        <p className='align-items-center text-center notHov'>{user.username}</p>
                    </div>


                    <div className="mb-2 position-relative">
                        <div className="position-relative d-flex flex-row">
                            <p className='mx-2 mt-2 align-items-center text-center react notHov' onClick={editor}>Edit</p>
                            <p className='mx-2 mt-2 align-items-center text-center react notHov' onClick={warn}>Delete</p>
                        </div>
                    </div>

                    <img className='rounded-1 border border-4 border-dark midImg' src={image} alt="Small pic"/>
                    <p className='align-items-center text-center notHov'>{rep.text}</p>
                </div>
            </UserContextProvider>
        );
    }
    else if (user !== null && userImage !== null)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center rounded-1 border border-4 border-dark m-3 position-relative">
                    <div className="d-flex flex-row position-relative">
                        <img className='rounded-5 border border-2 border-dark smalImg mx-2 mt-2' src={userImage} alt="Samll account pic"/>
                        <p className='align-items-center text-center notHov'>{user.username}</p>
                    </div>

                    <img className='rounded-1 border border-4 border-dark midImg' src={image} alt="Small pic"/>
                    <p className='align-items-center text-center notHov'>{rep.text}</p>
                </div>
            </UserContextProvider>
        );
    }
}