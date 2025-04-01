//imports
import axios from 'axios';
import BugItem from '../comp/bugComp.js';
import useAPI from '../../hooks/useAPI.tsx'
import UserContext from "../../contexts/userContext.js";
import { useEffect, useState, useContext } from 'react';

let bug;

//shows all the accounts pages
export default function BugReport() {
  //sets up variables
  const [newBug] = useState({
    puzzle_id: "",
    user_id: "",
    text: "",
    fixed: false,
    file: null
  });

  const { postRequest, putRequest } = useAPI();
  const { id, session } = useContext(UserContext);
  const [errors, setError] = useState("");
  const [bugs, setBugs] = useState([]);
  const [users, setUser] = useState([]);

  //grabs the bugs from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/bugs')
         .then(response => {
          setBugs(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

    //grabs all users that made the puzzles from the database
    useEffect(() => {
      axios.get('https://puz-sable.vercel.app/api/users')
        .then(response => {
          let use = []
  
          response.data.forEach(dat => 
          {
            for(let i = 0; i < bugs.length; i++)
            {
              if (dat._id === bugs[i].user_id)
              {
                use.push(dat);
                break;
              }
            };
          })
  
          setUser(use)
        })
        .catch(e => {
          console.log(e);
        });
    });

  //creates a new bug
  const makeBug = () =>
    {       
      newBug.puzzle_id = null;
      newBug.user_id = id;
      newBug.text = document.getElementById("text comm").value;
      newBug.fixed = false;
      newBug.file = document.getElementById("file comm").files[0];
  
      postRequest('https://puz-sable.vercel.app/api/bugs', newBug, {
        headers: {
            "Content_type":"Mulipart/form-data",
            Authorization: `Bearer ${session}`
        }
      })  
  
      setTimeout(function()
      {
        noPopup();
      }, 1000);   
    }

    function fillPopUpCom()
    {
      if (document.querySelector(".popupEdit"))
      {
        document.querySelector(".popupEdit").style.display = "none";
        document.getElementById("edit com text").value = "";
        document.getElementById("edit com file").value = null;  
      }

      document.querySelector(".popupComm").style.display = "flex";
    }

  function fillPopUpEdit(bu)
  {
    bug = bu;

    if (document.querySelector(".popupComm").style.display)
    {
      document.querySelector(".popupComm").style.display = "none";
      document.getElementById("text comm").value = "";
      document.getElementById("file comm").value = null;
    }

    document.querySelector(".popupEdit").style.display = "flex";
  }

  function editComm(s)
  {
    newBug.puzzle_id = s.puzzle_id;
    newBug.user_id = s.user_id;

    if (document.getElementById("edit com text").value && document.getElementById("edit com text").value !== "" && document.getElementById("edit com text").value !== null && document.getElementById("edit com text").value !== undefined)
    {
      newBug.text = document.getElementById("edit com text").value;
    }
    else
    {
      newBug.text = s.text;
    }

    newBug.fixed = false
    newBug.file = document.getElementById("edit com file").files[0];

    if (newBug.text === null || newBug.text === "") 
    {
      setError("no reply text empty")
    } 
    else 
    {
      putRequest(`https://puz-sable.vercel.app/api/bugs/${s._id}`, newBug, {
        headers: {
          "Content_type":"Mulipart/form-data",
          Authorization: `Bearer ${session}`
        }
      })
    }

    setBugs([])

    setTimeout(function()
    {
      noPopup();
    }, 1000); 
  }

  //deletes the users bug
  function destroy(bu)
  {
    bug = bu;
 
    axios.delete(`https://puz-sable.vercel.app/api/bugs/${bug._id}`, {
      headers: {
        Authorization: `Bearer ${session}`
    }}) 
      
    setTimeout(function()
    {  
      axios.get('https://puz-sable.vercel.app/api/bugs')
      .then(response => {    
        setBugs(response.data);      
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

    axios.get('https://puz-sable.vercel.app/api/bugs')
    .then(response => {
      setBugs(response.data)  
    })
    .catch(e => {
      console.log(e);
    });
  }

  function editor()
  {
    editComm(bug)
  }

  //checks for the bugs
  if (!bugs[0])
  {
    return ( 
      <div className="align-items-center text-center">
      <div className="align-items-center text-center butHov p-0 ms-1">
        <button className="align-items-center text-center rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Bring up a bug" onClick={fillPopUpCom}>
            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bug-fill me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"/>
                <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"/>
              </svg>

              <p className='my-0 d-none d-md-block'>
                REPORT BUG
              </p>
            </div>
          </button>
        </div>    

        <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>

        <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
                
        <div className='align-items-center text-center'>
          <div className="spinner-border" role="status"/>
        </div>

        <div className="popupComm m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Text" id='text comm'/>
          </div>
          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='file comm'/>
          </div>

          <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Back
                </p>
              </div>
            </button>
          
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Creates comment" onClick={makeBug}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Send
                </p>
              </div>
            </button>
          </div>  
        </div>
      </div>

      <div className="popupEdit m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Edit comment" id='edit com text'/>
          </div>

          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='edit com file'/>
          </div>

          <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Back
                </p>
              </div>
            </button>
          
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Edits comment" onClick={editor}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Edit
                </p>
              </div>
            </button>
          </div>          
        </div>
      </div>
      </div>
    );
  }

  //displays the bugs
  return (
    <div className="align-items-center text-center">
      <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Bring up a bug" onClick={fillPopUpCom}>
            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bug-fill me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"/>
                <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"/>
              </svg>

              <p className='my-0 d-none d-md-block'>
                REPORT BUG
              </p>
            </div>
          </button>
        </div>    

      <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>

      <ul className='row align-items-center text-center'>
      {
        bugs.map((bug, index) => <li className='col-4 align-items-center text-center' key={index}>{BugItem(bug, users, id, fillPopUpEdit, destroy)}</li>)
      }
    </ul>

    <div className="popupComm m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Text" id='text comm'/>
          </div>
          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='file comm'/>
          </div>

          <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Back
                </p>
              </div>
            </button>
          
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Creates comment" onClick={makeBug}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Send
                </p>
              </div>
            </button>
          </div>  
        </div>
      </div>

      <div className="popupEdit m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Edit comment" id='edit com text'/>
          </div>

          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='edit com file'/>
          </div>

          <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Back
                </p>
              </div>
            </button>
          
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Edits comment" onClick={editor}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Edit
                </p>
              </div>
            </button>
          </div>          
        </div>
      </div>
    </div>

    
  );
}