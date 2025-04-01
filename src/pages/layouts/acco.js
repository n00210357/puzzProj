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

let databaseProblem = 0;

let comImg;
let edtImg;

if (document.getElementById("file comm") &&  document.getElementById("file comm").files[0] !== null)
{
  comImg = document.getElementById("file comm").files[0];

  console.log(document.getElementById("file comm").files[0])
  console.log(comImg)
  console.log(" ")
}
else
{
  comImg = undefined
}

if (document.getElementById("edit com file") && document.getElementById("edit com file").files[0] !== null)
{
  edtImg = document.getElementById("edit com file").files[0];
}
else
{
  edtImg = undefined
}

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
    if (id !== null && user === null)
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

  if (databaseProblem === 1 && loading)
  {
    return (
      <UserContextProvider>
        <h1 className='align-items-center text-center m-0 my-5'>Trouble connecting to database</h1>
        <h1 className='align-items-center text-center m-0 my-5'>Try again later</h1>
      </UserContextProvider>)
  }
  else if (databaseProblem === 2 && user == null)
  {
    return (
      <UserContextProvider>
        <h1 className='align-items-center text-center m-0 my-5'>Your user is not found</h1>
        <h1 className='align-items-center text-center m-0 my-5'>This could be because of trouble connecting to database</h1>
        <h1 className='align-items-center text-center m-0 my-5'>Try again later</h1>
      </UserContextProvider>)
  }

  //checks for user
  if (user == null || loading)
  {
    setTimeout(function()
    {  

      if (loading === true)
      {
        databaseProblem = 1;
      }
      else if (user === null)
      {
        databaseProblem = 2;
      }

    }, 30000); 

    return (
      <UserContextProvider>
        <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
        
        <div className='align-items-center text-center'>
          <div className="spinner-border" role="status"/>
        </div>
      </UserContextProvider>
     );
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
  }, 30000); 

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

  if (mess === null || mess === undefined || mess.length === 0 || comm.length === 0)
  {
    //displays the users account
    return (
    <UserContextProvider>  
      <div className='row align-items-center text-center'>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
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

        <div className="col-sm-12 col-md-4">
          <div className="card-body align-items-center text-center">
            <img className='rounded-5 border border-4 border-dark bigImg' src={image} alt="Your account's pic"/>

            <h4 className='align-items-center text-center my-3'>{user.username}</h4>

            <p className='align-items-center text-center notHov'>{user.email}</p>
            <p className='align-items-center text-center notHov'>{user.about}</p>
            <p className='align-items-center text-center notHov'>Created at {user.createdAt.slice(0, 10)}</p>

            <h3 className='align-items-center text-center my-3 redText'>{error}</h3>
            <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>
          </div>

          <div className="align-items-center text-center d-flex flex-row">
            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Edit your account details">
                <a href="../accoEdit">
                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>

                    <p className='my-0 d-none d-md-block'>
                      Edit
                    </p>
                  </div>
                </a>
              </button>
            </div> 

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Delete your account" onClick={warn}>
                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-0-circle-fill me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>

                    <p className='my-0 d-none d-md-block'>
                      Delete
                    </p>
                  </div>
              </button>
            </div> 
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
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

        <div className="col-sm-12 col-md-4">
          <h4 className='align-items-center text-center my-3'>No messages</h4>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
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

        <div className="col-sm-12 col-md-4">
          <div className="card-body align-items-center text-center">
            <img className='rounded-5 border border-4 border-dark bigImg' src={image} alt="Your account's pic"/>

            <h4 className='align-items-center text-center my-3'>{user.username}</h4>

            <p className='align-items-center text-center notHov'>{user.email}</p>
            <p className='align-items-center text-center notHov'>{user.about}</p>
            <p className='align-items-center text-center notHov'>Created at {user.createdAt.slice(0, 10)}</p>

            <h3 className='align-items-center text-center my-3 redText'>{error}</h3>
            <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>
          </div>

          <div className="align-items-center text-center d-flex flex-row">
            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Edit your account details">
                <a href="../accoEdit">
                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>

                    <p className='my-0 d-none d-md-block'>
                      Edit
                    </p>
                  </div>
                </a>
              </button>
            </div> 

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Delete your account" onClick={warn}>
                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-0-circle-fill me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>

                    <p className='my-0 d-none d-md-block'>
                      Delete
                    </p>
                  </div>
              </button>
            </div> 
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
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

        <div className="col-sm-12 col-md-4">
          <h4 className='align-items-center text-center my-3'>Messages</h4>
          
          <div>
            <select className="align-items-center rounded-1 border border-4 border-dark p-3" id="foo"/>
          </div>

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

          <ul className='align-items-center text-center overflow-scroll'>
          {
            comm.map((s, index) => <li className='align-items-center text-center' key={index}>{CommentItem(false, s, undefined, messa, id, undefined, fillPopUpEdit, delComm, true)}</li>)
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
            <img src={comImg} alt="No image"/>
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
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Edit comment" id='edit com text'/>
          </div>

          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='edit com file'/>
            <img src={edtImg} alt="No image"/>
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
    </UserContextProvider>
  );
}