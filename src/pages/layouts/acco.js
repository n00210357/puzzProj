//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import img from '../../hooks/userPlaceholder.png';
import PuzzleItem from '../comp/puzzleComp.js';
import useAPI from '../../hooks/useAPI.tsx'
import { CommentItem } from "../comp/commComp.js";
import { useEffect, useState, useContext } from 'react';

let comStop = 0;
let comment;
let comCheck = false;
let messa = [];

//account pages function
export default function AccoPage() {
  //sets up variables
  const { postRequest, putRequest, loading, error } = useAPI();
  const [user, setUser] = useState(null);
  const [puzzles, setPuzzles] = useState([]); 
  const [comm, setComm] = useState([]);
  const [mess, setMess] = useState([]);
  const [errors, setError] = useState("");
  const { session, id, signOut } = useContext(UserContext);
  const [newComm] = useState({
    puzzle_id: "",
    user_id: "",
    text: "",
    file: null
  });

  //grabs user from database
  useEffect(() => {
    if (id !== null)
    {
      axios.get(`https://puz-sable.vercel.app/api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(e => {
        console.log(e);
      });

      //grabs all puzzles from the database
      if (puzzles[0] == null)
      {
        axios.get('https://puz-sable.vercel.app/api/puzzles')
        .then(response => {
          let puz = []
  
            response.data.forEach(pu => {
              if (pu.user_id === id)
              {
                puz.push(pu);
              }
            });
  
            setPuzzles(puz);
        })
        .catch(e => {
          console.log(e);
        });
      }

      if ((comm[0] === null || comm[0] === undefined) && id !== null && comStop <= 3)
      {        
        axios.get('https://puz-sable.vercel.app/api/comments')
        .then(response => {
            let com = []

            response.data.forEach(dat => {
              if (dat.user_id === id || dat.puzzle_id === id)
              {                           
                com.push(dat)
              }
            });
    
            setComm(com); 
        })
        .catch(e => {
          console.log(e);
        });

        comStop = comStop + 1;      
      }
   
      if ((mess[0] === null || mess[0] === undefined) && (comm[0] !== null || comm[0] !== undefined) && id !== null)
      {         
        axios.get(`https://puz-sable.vercel.app/api/users`)
        .then(response => {
          let mes = []
    
          response.data.forEach(dat => {      
            comm.forEach(com => {
              if (com.puzzle_id === dat._id || com.user_id === dat._id )
              {        
                if (mes[0] === undefined || mes[0] === null)
                {
                  mes[0] = dat
                }
                else
                {
                  for(let i = 0; i < mes.length; i++)
                  {
                    if (mes[i] === dat)
                    {
                      break;
                    }

                    if (i === mes.length - 1 && mes[i] !== dat)
                    {
                      mes.push(dat)
                    }
                  }
                }
              }
            });
          });
  
          setMess(mes);   
        })
        .catch(e => {
          console.log(e);
        });
      }
    }

    if (comCheck === true && comm.length === 0)
    {
      setTimeout(function()
      {  
        comCheck = false;
      }, 2000); 
    }
  });

  //checks for user
  if (user == null || loading)
  {
    return <h1 className="card-body align-items-center text-center">Loading...</h1>
  }

  (function() {
    var elm = document.getElementById('foo'),
    df = document.createDocumentFragment();
    
    for (var i = 0; i < mess.length; i++) 
    {
        var option = document.createElement('option');
        option.value = i;
        option.appendChild(document.createTextNode(mess[i].username));
        df.appendChild(option);
    }


    if (df !== null && elm !== null)
    {
      if (elm.length === 0)
      {
        elm.appendChild(df);
      }

      for (let i = 0; i < elm.length; i++)
      {
        if (elm[i] === df)
        {
          break;
        }
        else if (i === elm.length)
        {
          elm.appendChild(df);
        }
      }
    }
  }());

  //warns user of deleting their account
  function warn() 
  {
    if (window.confirm("Are you sure you want to DELETE your account")) 
    {
      destroy()
    } 
  }

  //deletes the users account
  function destroy()
  {
    axios.delete(`https://puz-sable.vercel.app/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${session}`
    }})
    .then()
    setTimeout(function()
    {
      signOut();
    }, 2000);    
  }
  
  //sets up image
  let image;

  if (user.image_path && user.image_path !== null && user.image_path !== undefined && user.image_path !== "http://api-image.s3.eu-west-1.amazonaws.com/undefined")
  {
    image = user.image_path;
  }
  else
  {
    image = img
  }

  function fillPopUpCom()
  {
    document.querySelector(".popupEdit").style.display = "none";
    document.getElementById("edit com text").value = "";
    document.getElementById("edit com file").value = null;
    document.querySelector(".popupComm").style.display = "flex";
  }

  function fillPopUpEdit(comme)
  {
    comment = comme;

    document.querySelector(".popupComm").style.display = "none";
    document.getElementById("text comm").value = "";
    document.getElementById("file comm").value = null;
    document.querySelector(".popupEdit").style.display = "flex";
  }

  //creates a new s
  const makeComm = (_id) =>
  {       
    newComm.puzzle_id = _id;
    newComm.user_id = id;
    newComm.text = document.getElementById("text comm").value;
    newComm.file = document.getElementById("file comm").files[0];
  
    postRequest('https://puz-sable.vercel.app/api/comments', newComm, {
      headers: {
          "Content_type":"Mulipart/form-data",
          Authorization: `Bearer ${session}`
      }
    })  
  
    setTimeout(function()
    {
      noPopup();
    }, 1500);   
  }

  function editor()
  {
    editComm(comment)
  }

  function editComm(s)
  {
    newComm.puzzle_id = s.puzzle_id;
    newComm.user_id = s.user_id;

    if (document.getElementById("edit com text").value && document.getElementById("edit com text").value !== "" && document.getElementById("edit com text").value !== null && document.getElementById("edit com text").value !== undefined)
    {
      newComm.text = document.getElementById("edit com text").value;
    }
    else
    {
      newComm.text = s.text;
    }

    newComm.file = document.getElementById("edit com file").files[0];

    if (newComm.text === null || newComm.text === "") 
    {
      setError("no reply text empty")
    } 
    else 
    {
      putRequest(`https://puz-sable.vercel.app/api/comments/${s._id}`, newComm, {
        headers: {
          "Content_type":"Mulipart/form-data",
          Authorization: `Bearer ${session}`
        }
      })
    }

    setTimeout(function()
    {
      noPopup();
    }, 1000); 
  }

  //deletes the users comment
  function delComm(commm)
  {
    comment = commm;
 
    axios.delete(`https://puz-sable.vercel.app/api/comments/${comment._id}`, {
      headers: {
        Authorization: `Bearer ${session}`
    }}) 
      
    setTimeout(function()
    {  
      axios.get('https://puz-sable.vercel.app/api/comments')
      .then(response => {
        let com = []
      
        response.data.forEach(dat => {
          if (dat.user_id === id || dat.puzzle_id === id)
          {              
            com.push(dat)
          }
        });
  
        setComm(com);       
      })
      .catch(e => {
        console.log(e);
      });
    }, 1500); 
  }

  function noPopup()
  {
    document.querySelector(".popupComm").style.display = "none";
    document.getElementById("text comm").value = "";
    document.getElementById("file comm").value = null;

    if (document.querySelector(".popupEdit"))
    {
      document.querySelector(".popupEdit").style.display = "none";
      document.getElementById("edit com text").value = "";
      document.getElementById("edit com file").value = null;
    }

    if (document.querySelector(".popupEditRep"))
      {
        document.querySelector(".popupEdit").style.display = "none";
        document.getElementById("edit com text").value = "";
        document.getElementById("edit com file").value = null;
      }

    if (document.querySelector(".popupRep"))
    {
      document.querySelector(".popupRep").style.display = "none";
      document.getElementById("text rep").value = "";
      document.getElementById("file rep").value = null;
    }

    setTimeout(function()
    {  
      axios.get('https://puz-sable.vercel.app/api/comments')
      .then(response => {
        let com = []
      
        response.data.forEach(dat => {
          if (dat.user_id === id || dat.puzzle_id === id)
          {              
            com.push(dat)
          }
        });
  
        setComm(com);       
      })
      .catch(e => {
        console.log(e);
      });
    }, 1500); 
  }

  if (mess === null || mess === undefined || mess.length === 0)
  {
      //displays the users account
  return (
    <UserContextProvider>            
      <div className='row align-items-center text-center'>
        <div className="col-4 overflow-scroll">
            <h4>Your Puzzles</h4>
            <ul className='align-items-center text-center'>
            {
              puzzles.map((puzzle, index) => <li className='align-items-center text-center my-3' key={index}>{PuzzleItem(puzzle, user, session, id)}</li>)
            }
          </ul>
        </div>

        <div className="col-4">
          <div className="card-body align-items-center text-center">
            <img src={image} alt="profile"/>
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.about}</p>
            <p className="card-text">{error}</p>
            <p className="card-text">{errors}</p>
          </div>

          <div className="container align-items-center text-center my-2">
            <button className="mx-3 my-2">
              <a href="../accoEdit">
                <h3 className="but">
                  EDIT
                </h3>
              </a>
            </button>
      
            <button id="click" className="mx-3 my-2" value="check" type="button" onClick={warn}>
                <h3 className="but">
                    DELETE
                </h3>
            </button>
          </div>
        </div>

        <div className="col-4 overflow-scroll">
          <h4>No messages </h4>
        </div>       
      </div>

      <div className="popupComm m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Text" id='text comm'/>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='file comm'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={makeComm}>
              Confirm
          </button>
        </div>
      </div>

      <div className="popupEdit m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Edit comment" id='edit com text'/>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='edit com file' name='file'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={editor}>
              Confirm
          </button>
        </div>
      </div>
    </UserContextProvider>
  );
  }

  if (document.getElementById('foo') && document.getElementById('foo').value != null && document.getElementById('foo').value !== undefined)
  {
    messa[0] = user
    messa[1] = mess[document.getElementById('foo').value]
  }
  else
  {
    messa[0] = user
  }

  //displays the users account
  return (
    <UserContextProvider>            
      <div className='row align-items-center text-center'>
        <div className="col-4 overflow-scroll">
            <h4>Your Puzzles</h4>
            <ul className='align-items-center text-center'>
            {
              puzzles.map((puzzle, index) => <li className='align-items-center text-center my-3' key={index}>{PuzzleItem(puzzle, user, session, id)}</li>)
            }
          </ul>
        </div>

        <div className="col-4">
          <div className="card-body align-items-center text-center">
            <img src={image} alt="profile"/>
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.about}</p>
            <p className="card-text">{error}</p>
            <p className="card-text">{errors}</p>
          </div>

          <div className="container align-items-center text-center my-2">
            <button className="mx-3 my-2">
              <a href="../accoEdit">
                <h3 className="but">
                  EDIT
                </h3>
              </a>
            </button>
      
            <button id="click" className="mx-3 my-2" value="check" type="button" onClick={warn}>
                <h3 className="but">
                    DELETE
                </h3>
            </button>
          </div>
        </div>

        <div className="col-4 overflow-scroll">
          <h4>Your messages </h4>
          
          <div>
            <select id="foo"></select>
          </div>

          <div>
            <button id="clickMe" className="align-items-center text-center mx-3 my-2" value="makeComment" type="button" onClick={fillPopUpCom}>
              Message
            </button>     
          </div>

          <ul className='align-items-center text-center'>
          {
            comm.map((s, index) => <li className='align-items-center text-center' key={index}>{CommentItem(false, s, undefined, messa, id, undefined, fillPopUpEdit, delComm, true)}</li>)
          }
          </ul>
        </div>       
      </div>

      <div className="popupComm m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Text" id='text comm'/>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='file comm'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={makeComm}>
              Confirm
          </button>
        </div>
      </div>

      <div className="popupEdit m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Edit comment" id='edit com text'/>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='edit com file' name='file'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={editor}>
              Confirm
          </button>
        </div>
      </div>
    </UserContextProvider>
  );
}