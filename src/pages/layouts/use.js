//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import img from '../../hooks/userPlaceholder.png';
import PuzzleItem from '../comp/puzzleComp.js';
import useAPI from '../../hooks/useAPI.tsx'
import { CommentItem } from "../comp/commComp.js";
import { useEffect, useState, useContext } from 'react';

let comment;
let comCheck = false;

//account pages function
export default function UseLayout() {
  //sets up variables
  const { postRequest, putRequest, loading, error } = useAPI();
  const [user, setUser] = useState([]);
  const [puzzles, setPuzzles] = useState([]); 
  const { session, id } = useContext(UserContext);
  const [comm, setComm] = useState([]);
  const [errors, setError] = useState("");
  const [newComm] = useState({
    puzzle_id: "",
    user_id: "",
    text: "",
    file: null
  });

  var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  
  //grabs user from database
  useEffect(() => {
    if (_id !== null && id !== null && (user[0] === null || user[0] === undefined))
    {
      let users = []
      axios.get(`https://puz-sable.vercel.app/api/users/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        users[0] = response.data
      })
      .catch(e => {
        console.log(e);
      });

      axios.get(`https://puz-sable.vercel.app/api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        users[1] = response.data
        setUser(users)
      })
      .catch(e => {
        console.log(e);
      });
    }

    //grabs all puzzles from the database
    if (puzzles[0] == null)
    {
      axios.get('https://puz-sable.vercel.app/api/puzzles')
      .then(response => {
        let puz = []

          response.data.forEach(pu => {
            if (pu.user_id === _id)
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

    axios.get('https://puz-sable.vercel.app/api/comments')
    .then(response => {
      if (comm.length === 0)
      {
        let com = []
    
        response.data.forEach(dat => {
          if ((dat.puzzle_id === _id && dat.user_id === id) || (dat.puzzle_id === id && dat.user_id === _id))
          {              
            com.push(dat)
          }
        });

        setComm(com);      
      }
    })
    .catch(e => {
      console.log(e);
    });
  });

  if (comCheck === true && comm.length === 0)
  {
    setTimeout(function()
    {  
      comCheck = false;
    }, 2000); 
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
  const makeComm = () =>
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
  function destroy(commm)
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
            if ((dat.puzzle_id === _id && dat.user_id === id) || (dat.puzzle_id === id && dat.user_id === _id))
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
          if ((dat.puzzle_id === _id && dat.user_id === id) || (dat.puzzle_id === id && dat.user_id === _id))
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

  
  let slideIndex = 1;

  // Next/previous controls
  function plusSlides() {
    showSlides(slideIndex += 1);
  }

  function minusSlides() {
    showSlides(slideIndex -= 1);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) 
    {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++)   
    {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
    if (slides[slideIndex-1])
    {
      slides[slideIndex-1].style.display = "block";  
    }
    if (dots[slideIndex-1])
    {
      dots[slideIndex-1].className += " active";
    }
  }

  //checks for user
  if (user[0] == null || loading)
  {
    return (
      <div className="align-items-center text-center">
        <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
        <div className='align-items-center text-center'>
          <div className="spinner-border" role="status"/>
        </div>
      </div>
    )
  }
  
  //sets up image
  let image;

  if (user[0].image_path && user[0].image_path !== null && user[0].image_path !== undefined)
  {
    image = user[0].image_path;
  }
  else
  {
    image = img
  }

    if (image.charAt(44) === "u" && image.charAt(45) === "n" && image.charAt(46) === "d" && image.charAt(47) === "e")
    {
      image = img
    }

  //displays the users account
  return (
    <UserContextProvider>    
      <div>   
          <div className="row"> 
            <div className="col-4 ps-3 d-none d-md-block">
              <h4 className='align-items-center text-center my-3'>Your puzzles</h4>
                <div className="slideshow-container align-items-center text-center">
                {
                  puzzles.map((puzzle, index) => <div className='mySlides fade align-items-center text-center my-3 ms-4' key={index}>{PuzzleItem(puzzle, user, session, id)}</div>)
                }
            
                <div className="d-flex flex-row">
                  <div className="align-items-center text-center flex-fill butHov p-0 ms-3">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Go back" onClick={minusSlides}>
                      <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                      </div>
                    </button>
                  </div>    
            
                  <div className="align-items-center text-center flex-fill butHov p-0 ms-3">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Go back" onClick={plusSlides}>
                      <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                        </svg>
                      </div>
                    </button>
                  </div>    
                </div>
              </div>
            <br/>
            </div>
            
            <div className="col-sm-12 col-md-4 align-items-center text-center">
              <div className="card-body align-items-center text-center">
                <img className='rounded-5 border border-4 border-dark bigImg' src={image} alt="This users account"/>
                <h4 className='align-items-center text-center my-3'>{user[0].username}</h4>
                <p className='align-items-center text-center notHov'>{user[0].email}</p>
                <p className='align-items-center text-center notHov'>{user[0].about}</p>

                <h3 className='align-items-center text-center my-3 redText'>{error}</h3>
                <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>
              </div>     
            </div>

            <div className="col-sm-12 col-0 ps-3 d-block d-md-none">
              <h4 className='align-items-center text-center my-3'>Your puzzles</h4>        
                <div className="slideshow-container align-items-center text-center">
                {
                  puzzles.map((puzzle, index) => <div className='mySlides fade align-items-center text-center my-3 ms-4' key={index}>{PuzzleItem(puzzle, user, session, id)}</div>)
                }            
           
                  <div className="d-flex flex-row">
                    <div className="align-items-center text-center flex-fill butHov p-0 ms-3">
                      <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Go back" onClick={minusSlides}>
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                          </svg>
                        </div>
                      </button>
                    </div>    
            
                    <div className="align-items-center text-center flex-fill butHov p-0 ms-3">
                      <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Go back" onClick={plusSlides}>
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                          </svg>
                        </div>
                      </button>
                    </div>    
                  </div>
                </div>
              <br/>
            </div>   

            <div className="col-sm-12 col-md-4 overflow-scroll align-items-center text-center">
              <h4 className="align-items-center text-center my-3">{user[0].username} & your messages </h4>

              <div className="my-3">
                <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
                  <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" value="makeComment" data-toggle="tooltip" title="Message this user" onClick={fillPopUpCom}>
                    <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-right me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                      </svg>

                      <p className='my-0 d-none d-md-block'>
                        Message
                      </p>
                    </div>
                  </button>
                </div>   
              </div>   

              <ul className='align-items-center text-center'>
              {
                comm.map((s, index) => <li className='align-items-center text-center' key={index}>{CommentItem(false, s, undefined, user, id, undefined, fillPopUpEdit, destroy)}</li>)
              }
              </ul>
            </div>
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
          
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Creates comment" onClick={makeComm}>
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
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Edit message" id='edit com text'/>
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
    </UserContextProvider>    
  );
}