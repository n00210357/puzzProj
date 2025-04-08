//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import Sketch from "react-p5";
import UserContext from '../../contexts/userContext';
import { useState, useEffect, useContext } from "react";
import { Outline, wordFiller, countOccurrences } from "../comPuz/puzLook.js";
import { mouseClicked } from "../comPuz/mousCont.js";

let start
let update

//GRID VARS
//grid box size
let boxSize = 50;

//the length of the grid
let xGridAmount = 10;
let yGridAmount = 10;

//the holds the cords for selected boxs
let recX = 0;
let recY = 0;
let filling = 0;
let dragDropDir = 0;
let boxed = false;
let droppable = false;
let hovingOverButton = false;
let letters = "0, 0, A"//, 0, 1, C, 0, 2, E, 0, 5, F, 0, 9, G";
let inputError = "";
let goal = [];
let oldGoal = [];
let goCheck = []

//MOUSE VARS
//stores if user clicked
let clicked = false;
let dontAdd = false;
let pause = false;

//CANVAS VARS
//A allows the canvase to be referenced
let border = 100;

//gets sketch size
let xSketchSize
let ySketchSize

//string that holds the placed in letters
const regex = /[^A-Za-z0-9]/;
let pros
let selectedGoal = -1;
let puzzlet;
let ind = 0;

//the create page
export default function CrePage()
{
  const {rememberedPuz, puzzCode} = useContext(UserContext);

  hovingOverButton = false;

  function dontDeselect()
  {
    hovingOverButton = true;
  }

  const [form, setForm] = useState({
    xGrid: 0,
    yGrid: 0,
    addGoal: "",
  });

  const [puzzType, setPuzzType] = useState(0);
  const [puzVal, setPuzVal] = useState(0)
  const [key, setKey] = useState([{ans: 'None', clue:''}])

  puzzlet = puzzType;
  
  if (puzzType === 1)
  {
    window.setInterval(rememberWork, 10000);
    wordsearch()
  }
  else if (puzzType === 2)
  {
    window.setInterval(rememberWork, 10000);
    crossword()
  }
  else if (puzzCode !== null)
  {
    start = null
    update = null
    //recoverWork()
  }
  else
  {
    start = null
    update = null
  }

  function goalAdder()
  {
    if (selectedGoal !== -1)
    {
      clicked = true
    }

    //inserts if text box not empty
    if (form.addGoal !== "" && form.addGoal != null && form.addGoal !== undefined && form.addGoal.length > 1)
    {
      //when pressed will attempt to insert the input boxs value into the goal 
      addToGoal(pros, form.addGoal)
    }  
    else if (form.addGoal !== "" && form.addGoal != null && form.addGoal !== undefined)
    {
      inputError = "goal is empty"
    }
    else
    {
      inputError = "goal needs to be longer then one letter"
    }

    document.getElementById("addGoal").value = "";
    setForm(form.addGoal, "");
  }

  //when button pressed it will delete the selected goal
  function removal()
  {
    if (selectedGoal !== -1)
    {
      clicked = true
    }

    if (selectedGoal >= 0 && selectedGoal <= goal.length - 1)
    {
      removeFromGoal(pros)
    } 
  } 

  //allows the fill button to be pressed
  function gridFiller()
  {
    if (selectedGoal !== -1)
    {
      clicked = true
    }

    filling = 1;
    checkAllGrid(pros)  
  }
    
  //allows the finsh button to be pressed
  function lastCheck()
  {
    if (selectedGoal !== -1)
    {
      clicked = true
    }
    
    rememberWork()

    if (puzzType === 1)
    {
      finalCheck(pros)
    }
    else if (puzzType === 2)
    {
      crossCheck();
    }
  }

  function rememberWork()
  {
    let puzCoding = String(puzzType) + "@ "
    puzCoding = puzCoding + xGridAmount + "@ " + yGridAmount + "@ "
    
    for(let x = 0; x < goal.length; x++)
    {
      if (x <= goal.length - 1)
      {
        puzCoding = puzCoding + goal[x] + "# "
      }
    }

    puzCoding = puzCoding + letters

    if (puzzCode !== puzCoding)
    {
      rememberedPuz(puzCoding)
    }
  }

  /*
  function recoverWork()
  {
    if (Number(puzzCode.split('@ ')[0]) === 1)
    {
      setPuzzType(Number(puzzCode.split('@ ')[0]))

      setForm(form.xGrid = Number(puzzCode.split('@ ')[1]))
      setForm(form.yGrid = Number(puzzCode.split('@ ')[2]))
      
      const star = puzzCode.split('@ ')[3]

      for(let i = 0; i < countOccurrences(star, '# '); i++)
      {
        goal.push(star.split('# ')[i])
      }

      letters = star.split('# ')[countOccurrences(star, '# ')]
      xGridAmount = form.xGrid
      yGridAmount = form.yGrid
      xSketchSize = (boxSize * xGridAmount) + border * 2;
      ySketchSize = (boxSize * yGridAmount) + border * 2;
    }
    else
    {
      rememberedPuz(null)
    }
  }
  */

  function labelPuzzleType()
  {
    if (puzVal === 0)
    {
      return(<p className='align-items-center text-center notHov'>Choose a puzzle</p>)
    }
    else if (puzVal === 1)
    {
      return(<p className='align-items-center text-center notHov'>Wordsearch</p>)
    }
  }

  async function startPuz()
  {
    xGridAmount = form.xGrid
    yGridAmount = form.yGrid

    xSketchSize = (boxSize * xGridAmount) + border * 2;
    ySketchSize = (boxSize * yGridAmount) + border * 2;
    

    setPuzzType(Number(puzVal))
  }

  function wrongPuz()
  {
    xSketchSize = undefined
    rememberedPuz(null)
    setPuzzType(0)
  }

  const handleChange = (e) => {
    setForm(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }));
  }

  function handleSelect(event)
  {
    setPuzVal(event.target.value)
  }

  if (dontAdd === true && (form.addGoal === "" || form.addGoal === null || form.addGoal === undefined))
  {
    dontAdd = false
  }
  else if (dontAdd === false && (form.addGoal !== "" || form.addGoal !== null || form.addGoal !== undefined))
  {
    dontAdd = true
  }

  useEffect((puzzType) => {
    if (puzzType !== 0)
    {
      const mp5 = <Sketch setup={start} draw={update}/>
      return mp5.remove;
    }
  }, []);

  if (puzzType === 0)
  {
    return(
      <UserContextProvider>
        <div className="align-items-center text-center my-3 row">  
          <h4 className='align-items-center text-center my-3'>Select the puzzles details</h4>

          <div className="row"> 
            <div className="col-lg-4 col-md-12"></div>

            <div className="col-lg-4 col-md-12">
            
            <label className="my-3">
              {labelPuzzleType()}

              <select className="align-items-center text-center rounded-1 border border-4 border-dark p-3" id="puzSel" onChange={handleSelect}>
                <option value={0}>Not selected</option>
                <option value={1}>Wordsearch</option>
                <option value={2}>Crossword</option>
                <option value={3}>Sudoku</option>
              </select>
            </label>

            <p className='align-items-center text-center notHov  mt-3 mb-0'>The amount of boxes on the X axis</p>
              <div>
                <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="xGrid" value={form.xGrid} onChange={handleChange} id='xGrid'                  
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) 
                    {
                      event.preventDefault();
                    }}
                  }>
                </input>
              </div>

              <p className='align-items-center text-center notHov mt-3 mb-0'>The amount of boxes on the Y axis</p>
              <div>
                <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="yGrid" value={form.yGrid} onChange={handleChange} id='yGrid'                  
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) 
                    {
                      event.preventDefault();
                    }}
                  }>
                </input>
              </div>

              <div className="align-items-center text-center flex-fill butHov p-0 ms-1 my-4">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Start making the puzzle" onClick={startPuz}>
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-puzzle-fill me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.5.5 0 0 0-.115.118l-.012.025L6.5 4.5v.003l.003.01q.005.015.036.053a.9.9 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.9.9 0 0 0 .271-.194.2.2 0 0 0 .036-.054l.003-.01v-.008l-.012-.025a.5.5 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.5.5 0 0 0 .115-.118l.012-.025.001-.006v-.003l-.003-.01a.2.2 0 0 0-.036-.053.9.9 0 0 0-.27-.194C8.91 11.1 8.49 11 8 11s-.912.1-1.19.24a.9.9 0 0 0-.271.194.2.2 0 0 0-.036.054l-.003.01v.002l.001.006.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238z"/>
                              </svg>

                              <p className='my-0 d-none d-md-block'>
                                Start
                              </p>
                            </div>
                    </button>
                </div>  
            </div>

            <div className="col-lg-4 col-md-12"></div>
          </div>
        </div>
      </UserContextProvider>
    );
  }

  //the word search page
  if (puzzType === 1)
  {
    return(
      <UserContextProvider>
        <div className="align-items-center text-center my-3 row">
          <div className="col-sm-12 col-md-2 align-items-center text-center d-inline-flex flex-sm-row flex-md-column justify-content-center">
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen position-relative top-0 start-sm-0 start-md-50" placeholder="New goal" value={form.addGoal} onChange={handleChange} id='addGoal'></input>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={goalAdder}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                  <p className='d-md-block my-0'>
                    insert your new goal
                  </p>
                </div>
              </button>
            </div>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={removal}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                  <p className='d-md-block my-0'>
                    delete from goal
                  </p>
                </div>
              </button>
            </div>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={gridFiller}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                  <p className='d-md-block my-0'>
                    fill in the grid gaps
                  </p>
                </div>
              </button>
            </div>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={lastCheck}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                  <p className='d-md-block my-0'>
                    finshed puzzle
                  </p>
                </div>
              </button>
            </div>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={wrongPuz}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                  <p className='d-md-block my-0'>
                    Back
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className="col-sm-12 col-md-8">
            <Sketch setup={start} draw={update}/>
          </div>

          <div className="col-sm-12 col-md-2">
            
          </div>
        </div>
      </UserContextProvider>
    )
}

console.log(goal)

if (goal !== oldGoal && goal.length >= 1)
{
  setKey(goal);
  oldGoal = goal;
}
else if (key[0].ans != 'None' && key !== goal)
{
  setKey([{ans: 'None', clue:'None'}])
}

const makeComm = () =>
{       
  pause = true;
  goal[ind].clue = document.getElementById("text comm").value;
  
  noPopup();
}
 
function noPopup()
{
  pause = false;
  document.querySelector(".popupComm").style.display = "none";
  document.getElementById("text comm").value = "";
}
  
function assignClue()
{
  document.querySelector(".popupComm").style.display = "flex";
}

if (puzzType === 2)
{
  return(
    <UserContextProvider>
      <div className="align-items-center text-center my-3 row">
        <div className="col-sm-12 col-md-2 align-items-center text-center d-inline-flex flex-sm-row flex-md-column justify-content-center">
          <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
            <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={crosswordKey}>
              <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                <p className='d-md-block my-0'>
                  Find goals
                </p>
              </div>
            </button>
          </div>

          <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
            <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={gridFiller}>
              <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                <p className='d-md-block my-0'>
                  Block off empty spaces
                </p>
              </div>
            </button>
          </div>

          <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
            <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={lastCheck}>
              <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                <p className='d-md-block my-0'>
                  finshed puzzle
                </p>
              </div>
            </button>
          </div>

          <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
            <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark position-relative top-0 start-0 start-md-50 my-2" data-toggle="tooltip" title="Button" onMouseEnter={dontDeselect} onClick={wrongPuz}>
              <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                <p className='d-md-block my-0'>
                  Back
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="col-sm-12 col-md-8">
          <Sketch setup={start} draw={update}/>
        </div>

        <div className="col-sm-12 col-md-2">
          <ul className='align-items-center text-center'>
          {
            key.map((goa, index) => <li className='col-12 align-items-center text-center' key={index}>
              <div className="align-items-center text-center flex-fill butHov p-0 ms-1" onClick={() => {ind = index}}>
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Assign clue" onClick={assignClue}>
                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <p className="m-0">
                      {goa.ans}
                    </p>
                  </div>

                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <p className="m-0">
                      {goa.clue}
                    </p>
                  </div>
                </button>
              </div>  
            </li>)
          }
          </ul>
        </div>

        <div className="popupComm m-5">
            <div className="popup-content">
              <div>
                <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Text" id='text comm'/>
              </div>
        
              <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
                <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
                  <div className='fw-bolder justify-content-center py-3'>
                    <p className='my-0'>
                      Back
                    </p>
                  </div>
                </button>
                  
                <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Assign clue" onClick={makeComm}>
                  <div className='fw-bolder justify-content-center py-3'>
                    <p className='my-0'>
                      Add
                    </p>
                  </div>
                </button>
              </div>  
            </div>
          </div>
      </div>
    </UserContextProvider>
  )
}}

function wordsearch()
{    
  //draws once at start
  start = (p5, canvasParentRef) => {
    //draws sketch
    p5.createCanvas(xSketchSize, ySketchSize).parent(canvasParentRef)
    pros = p5
  }

  update = (p5) => {
    if (pause === false)
    {
    if (p5.mouseButton === "left")
    {
      let clic = mouseClicked(p5, clicked, boxed)
      pros = clic[0]
      clicked = clic[1]
      boxed = clic[2]
    }

    //moves the text over to the left
    p5.textAlign(p5.LEFT);

    //refreshs the background
    p5.background(220);

    //highlights a boxs if the mouse is over it or clicked
    if ((p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border)) || (clicked === true && selectedGoal === -1 && boxed === true))
    {
      //checks if clicked of just hovering over
      if (clicked === false)
      {
        p5.fill(150);
      }
      else if ((clicked === true && selectedGoal === -1) || boxed === true)
      {
        boxed = true;
        p5.fill(50);
      }

      //draws the square to darken
      p5.rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
    }  
    else if(selectedGoal !== -1 && ((p5.mouseX >= p5.width || p5.mouseX >= 0) || (p5.mouseY >= p5.width || p5.mouseY >= 0)))
    {
      boxed = false;

      if (clicked === false && hovingOverButton === false)
      {
        selectedGoal = -1;
      }
    }
  
    //refreshs selected goal
    if (p5.clicked === false && droppable === false)
    {
      selectedGoal = -1
    }
  
    //when space bar click it checks the grid
    if (selectedGoal === -1 && p5.keyIsPressed && p5.keyCode === 32)
    {
      checkAllGrid(p5)
    }
    
    wordFiller(p5, letters, boxSize, border)

    //creates borders
    p5.fill(0)
    p5.rect(0, 0, xSketchSize, border)
    p5.rect(0, 0, border, ySketchSize)
    p5.rect(p5.width - border, 0, border, ySketchSize)
    p5.rect(0, p5.height - border, xSketchSize, border)

    workSearchKey(p5);

    //fills the grid
    p5.fill(255)
    p5.textAlign(p5.CENTER)
    p5.textSize(12);
    p5.text(letters, 1, p5.height - (border - 24), xSketchSize)

    //draws the outline
    let all = Outline(p5, xGridAmount, yGridAmount, border, clicked, boxSize, selectedGoal, recX, recY)

    p5 = all[0]
    xGridAmount = all[1]
    yGridAmount = all[2]
    border = all[3]
    clicked = all[4]
    boxSize = all[5]
    selectedGoal = all[6]
    recX = all[7]
    recY = all[8]

    //allows the user to add to the grid
    if (dontAdd === false && clicked === true && selectedGoal === -1 && (p5.keyIsPressed && ((p5.keyCode >= 65 && p5.keyCode <= 90) || (p5.keyCode >= 97 && p5.keyCode <= 122))))
    {
      addToGrid(null, p5)
      p5.keyCode = null;
      clicked = false;    
    }
  }
  }
}

function crossword()
{    
  //draws once at start
  start = (p5, canvasParentRef) => {
    //draws sketch
    p5.createCanvas(xSketchSize, ySketchSize).parent(canvasParentRef)
    pros = p5
  }

  update = (p5) => {
    if (pause === false)
    {
    if (p5.mouseButton === "left")
    {
      let clic = mouseClicked(p5, clicked, boxed)
      pros = clic[0]
      clicked = clic[1]
      boxed = clic[2]
    }

    //moves the text over to the left
    p5.textAlign(p5.LEFT);

    //refreshs the background
    p5.background(220);

    //highlights a boxs if the mouse is over it or clicked
    if ((p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border)) || (clicked === true && selectedGoal === -1 && boxed === true))
    {
      if (p5.keyCode === 190)
      {
        addToGrid(String((recX - (border / boxSize)) + ', ' + ((recY - (border / boxSize)))  + ', ~'), p5)
        p5.keyCode = null;
        clicked = false;
      }

      //checks if clicked of just hovering over
      if (clicked === false)
      {
        p5.fill(150);
      }
      else if ((clicked === true && selectedGoal === -1) || boxed === true)
      {
        boxed = true;
        p5.fill(50);
      }

      //draws the square to darken
      p5.rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
    }  
    else if(selectedGoal !== -1 && ((p5.mouseX >= p5.width || p5.mouseX >= 0) || (p5.mouseY >= p5.width || p5.mouseY >= 0)))
    {
      boxed = false;

      if (clicked === false && hovingOverButton === false)
      {
        selectedGoal = -1;
      }
    }
  
    //refreshs selected goal
    if (p5.clicked === false && droppable === false)
    {
      selectedGoal = -1
    }
  
    //when space bar click it checks the grid
    if (selectedGoal === -1 && p5.keyIsPressed && p5.keyCode === 32)
    {
      checkAllGrid(p5)
    }
    
    wordFiller(p5, letters, boxSize, border)
    
    //creates borders
    p5.fill(0)
    p5.rect(0, 0, xSketchSize, border)
    p5.rect(0, 0, border, ySketchSize)
    p5.rect(p5.width - border, 0, border, ySketchSize)
    p5.rect(0, p5.height - border, xSketchSize, border)

    //draws the outline
    let all = Outline(p5, xGridAmount, yGridAmount, border, clicked, boxSize, selectedGoal, recX, recY);

    p5 = all[0]
    xGridAmount = all[1]
    yGridAmount = all[2]
    border = all[3]
    clicked = all[4]
    boxSize = all[5]
    selectedGoal = all[6]
    recX = all[7]
    recY = all[8]

    //fills the grid
    p5.fill(255)
    p5.textAlign(p5.CENTER)
    p5.textSize(12);
    p5.text(letters, 1, p5.height - (border - 24), xSketchSize)

    //allows the user to add to the grid
    if (dontAdd === false && clicked === true && selectedGoal === -1 && (p5.keyIsPressed && ((p5.keyCode >= 65 && p5.keyCode <= 90) || (p5.keyCode >= 97 && p5.keyCode <= 122))))
    {
      addToGrid(null, p5)
      p5.keyCode = null;
      clicked = false;    
    }
  }
  }
}

//allows the user to add a Letter to the grid
async function addToGrid(dragged, p5)
{  

  //checks if user is draggin a word form goal or just adding a single letter
  if (dragged === undefined || dragged === null)
  {
    letters = `${letters}, ${String(recX - (border / boxSize),)}, ${String(recY - (border / boxSize),)}, ${String.fromCharCode(p5.keyCode)}`
    lettSorter(String.fromCharCode(p5.keyCode))
  }
  else
  {
    letters = `${letters}, ${dragged}`
    lettSorter(dragged)
  }

  pros.keyCode = null;
}

//draws the wordsearch key
function workSearchKey(p5)
{    
  //draws currently assign goal
  p5.fill(255);
  p5.textSize(20);
  p5.textAlign(p5.LEFT, p5.CENTER);

  //draws all the words in the goal
  for(let i = 0; i < goal.length; i++)
  {
    //checks if a goal has been selected
    if (selectedGoal === -1)
    {
      goalSelect(i, p5)
    }
    else if (i === selectedGoal && clicked === true)
    {
      p5.fill(150, 150, 255)      
      p5.text(i + 1, 4, border + i * 40 + 20)
      p5.text(goal[i], 16, border + i * 40 + 20)
    }
    
    if (i !== selectedGoal)
    {    
      p5.text(i + 1, 4, border + i * 40 + 20)
      p5.text(goal[i], 16, border + i * 40 + 20)
    }

    p5.fill(255)
  }

  //draws the input and delete from goal inputs
  p5.textAlign(p5.CENTER, p5.CENTER)
  p5.fill(255, 0, 0);
  p5.textSize(9);
  p5.text(inputError, p5.width / 2, border / 2);

  //if a goal is selected the user will be able to drag a word from to goal to the grid
  if (selectedGoal !== -1)
  {
    dragDropWord(p5)
  }
}

//draws the crossword key
function crosswordKey()
{    
  //draws currently assign goal
  if (pros !== undefined)
  {
    pros.fill(255);
    pros.textSize(20);
    pros.textAlign(pros.LEFT, pros.CENTER);
  }

  let newWord = "";
  let newgoal = [];

  //checks the x axis
  for(let y = 0; y < yGridAmount; y++)
  { 
    for(let t = 0; t < xGridAmount; t++)
    {     
      if (letters.charAt(6 + (9 * (y + (t * yGridAmount)))) !== '~')
      {       
        newWord += letters.charAt(6 + (9 * (y + (t * yGridAmount))))
      }
      else
      {
        if (newWord.length >= 2)
        {
          newgoal.push({ans: newWord, clue: ""});
        }

        newWord = "";
      }  
    }

    if (newWord.length >= 2)
    {
      newgoal.push({ans: newWord, clue: ""});
    }

    newWord = "";
  }

  //checks the y axis
  for(let x = 0; x < xGridAmount; x++)
  { 
    for(let v = 0; v < xGridAmount; v++)
    {     
      if (letters.charAt(6 + (9 * (v + (x * yGridAmount)))) !== '~')
      {       
        newWord += letters.charAt(6 + (9 * (v + (x * yGridAmount))))
      }
      else
      {
        if (newWord.length >= 2)
        {
          newgoal.push({ans: newWord, clue: ""});
        }
    
        newWord = "";
      }  
    }
    
    if (newWord.length >= 2)
    {
      newgoal.push({ans: newWord, clue: ""});
    }
    
    newWord = "";
  }

 //draws all the words in the newgoal
  for(let i = 0; i < newgoal.length; i++)
  {
    for(let l = 0; l < newgoal.length; l++)
    {
      if (newgoal[l] === newgoal[i] && l !== i)
      {
        newgoal.splice(i, i)
      }
    };
  }

  console.log(newgoal)
  goal = newgoal
}

//select a goal with the mouse
function goalSelect(i, p5)
{
  //allows the user to select a goal
  if ((p5.mouseX <= border && p5.mouseX >= 0) && (p5.mouseY >= (border + i * 40 + 20 / 2) && p5.mouseY <= (20 + (border + i * 40 + 20 / 2))))
  {
    if (selectedGoal === -1 && clicked === true && boxed === false)
    {
      selectedGoal = i
    }

    p5.fill(0, 0, 255)
  }
}

//adds a new goal
function addToGoal(p5, neGo)
{
  //checks that the new goal is allowed
  let inp = regex.test(neGo)
  let dup = false

  //removes spacing
  const s = neGo.split(" ").join("")

  goal.forEach(go => {
    if (go.toUpperCase() === s.toUpperCase())   
    {  
      dup = true
    } 
  });

  //if new goal is good it is added to the goal
  if (inp === false && dup === false)
  {
    p5.append(goal, s.toUpperCase())
    inputError = " ";
  }
  else if (dup === true)
  {
    inputError = String(s + " is already in the goal")
  }
  else
  {
    inputError = "Only letters are allowed"
  }
}

//removes a selected goal
function removeFromGoal()
{
  let newGoal = []

  //adds all non deleting goal to the new goal
  goal.forEach(sel => 
  {
    if (sel !== goal[selectedGoal])
    {
      newGoal.push(sel)
    }
  });

  //add replaces goal with new goal 
  newGoal.push(goal[selectedGoal])
  newGoal.pop();
  goal = newGoal;
  selectedGoal = -1;
}

//allows users to drag words from goal into the wordsearch grid
function dragDropWord(p5)
{
  //rotates the placing of the words letters with space bar
  if (p5.keyIsPressed && p5.keyCode === 188 && selectedGoal !== -1)
  {
    if (dragDropDir <= 6)
    {
      dragDropDir = dragDropDir + 1
    }
    else
    {
      dragDropDir = 0
    }

    p5.keyIsPressed = false
  }

  //checks if mouse is on grid
  if (p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border) && selectedGoal !== -1)
  {    
    p5.fill(255)
    let lett;

    p5.textSize(32);
    p5.textAlign(p5.CENTER, p5.CENTER);

    //desides the angle of the word EAST
    if (dragDropDir === 0)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal] && goal[selectedGoal].length + (recX - (1 + (border / boxSize))) >= xGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word SOUTH EAST
    else if (dragDropDir === 1)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recX - (1 + (border / boxSize))) >= xGridAmount || goal[selectedGoal].length + (recY - (1 + (border / boxSize))) >= yGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word SOUTH
    else if (dragDropDir === 2)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recY - 3) >= yGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word SOUTH WEST
    else if (dragDropDir === 3)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - (border / boxSize))) * -1 <= -1 || goal[selectedGoal].length + (recY - ((1 + border / boxSize))) >= yGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word WEST
    else if (dragDropDir === 4)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word NORTH WEST
    else if (dragDropDir === 5)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - (border / boxSize))) * -1 <= -1 || ((goal[selectedGoal].length - 1) - (recY - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word NORTH
    else if (dragDropDir === 6)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recY - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    } //desides the angle of the word NORTH EAST
    else if (dragDropDir === 7)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recX - (1 + (border / boxSize))) >= xGridAmount || ((goal[selectedGoal].length - 1) - (recY - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }

    //places the indivdual letters
    if (goal[selectedGoal])
    {
    for (let i = 0; i < goal[selectedGoal].length; i++) 
    {
      lett = goal[selectedGoal].charAt(i);

      //desides the angle of the word EAST
      if (dragDropDir === 0)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor(recY - (border / boxSize)) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) + i) + ', ' + ((recY - (border / boxSize)))  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH EAST
      else if (dragDropDir === 1)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) + i) + ', ' + ((recY - (border / boxSize)) + i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH
      else if (dragDropDir === 2)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize))) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize))) + ', ' + ((recY - (border / boxSize)) + i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH WEST
      else if (dragDropDir === 3)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) - i) + ', ' + ((recY - (border / boxSize)) + i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word WEST
      else if (dragDropDir === 4)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize))) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) - i) + ', ' + ((recY - (border / boxSize)))  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH WEST
      else if (dragDropDir === 5)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) - i) + ', ' + ((recY - (border / boxSize)) - i)  + ', ' + lett), p5)
  
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH
      else if (dragDropDir === 6)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize))) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize))) + ', ' + ((recY - (border / boxSize)) - i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH EAST
      else if (dragDropDir === 7)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) + i) + ', ' + ((recY - (border / boxSize)) - i)  + ', ' + lett), p5)
  
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }
    }
  }
  }

  p5.fill(255)
}

//sorts the letters on the letters string
async function lettSorter(newby)
{
  let lett = [];

  //goes through all letters removing those on the same grid box
  for(let i = 0; i < countOccurrences(letters, ', ') / 3; i++)
  {
    let z = i * 3

    //checks if newby is just a letter or is from the user dragging in the word
    if (newby.length === 1)
    {
      for (let x = 0; x < countOccurrences(letters,String(recX - (border / boxSize)) + ", " + String(recY - (border / boxSize)) + ", " + newby); x++)
      {
        if (x >= 1)
        {
          letters = letters.split(String(recX - (border / boxSize)) + ", " + String(recY - (border / boxSize)) + ", " + newby + ", ").join('');
        }
      }

      //checks for letter on the same space as the new one
      if (letters.split(', ')[0 + z] === String(recX - (border / boxSize)) && 
      letters.split(', ')[1 + z] === String(recY - (border / boxSize)) && 
      letters.split(', ')[2 + z].toUpperCase() !== String(newby).toUpperCase())
      {

      }
      else
      {
        //sets up future letters
        let t = letters.split(', ')[0 + z]
        t = t + ', '
        t = t + letters.split(', ')[1 + z]
        t = t + ', '
        t = t + letters.split(', ')[2 + z]
        t = t + ', '
        lett.push(t) 
      }   
    } 
    else
    {
      for (let x = 0; x < countOccurrences(letters, newby); x++)
      {
        if (x >= 1)
        {
          letters = letters.split(newby + ", ").join('');
        }
      }

      //checks for letter on the same space as the new one
      if (letters.split(', ')[0 + z] === newby.split(', ')[0] && 
      letters.split(', ')[1 + z] === newby.split(', ')[1] && 
      letters.split(', ')[2 + z].toUpperCase() !== String(newby.split(', ')[2]).toUpperCase())
      {

      }
      else
      {
        //sets up future letters
        let t = letters.split(', ')[0 + z]
        t = t + ', '
        t = t + letters.split(', ')[1 + z]
        t = t + ', '
        t = t + letters.split(', ')[2 + z]
        t = t + ', '
        lett.push(t)  
      } 
    }
  }

  //sorts letters
  lett.sort()
  
  //removes the ', ' of the final letter in letters
  let finLet = lett[lett.length - 1].split(', ')[0]
  finLet = finLet + ', '
  finLet = finLet + lett[lett.length - 1].split(', ')[1]
  finLet = finLet + ', '
  finLet = finLet + lett[lett.length - 1].split(', ')[2]
  lett[lett.length - 1] = finLet

  let ley = null
  
  //puts the new letter sorted and filtered in to the letter string
  lett.forEach(le => 
  {
    if (lett[0] !== le)
    {
      ley = ley + le
    }
    else
    {
      ley = le
    }
  });
  
  lett = null
  
  letters = ley
  letters = letters.toUpperCase()
}

//checks the whole grid
async function checkAllGrid(p5)
{
  let breaker = false;

  //checks the x axis
  for(let x = 0; x < xGridAmount; x++)
  {
    //stops x when called
    if (breaker === true)
    {
      break;
    }

    //checks the y axis
    for(let y = 0; y < yGridAmount; y++)
    {    
      if (puzzlet === 1 && String(x) === letters.split(', ')[(x * yGridAmount) * 3] && String(y) === letters.split(', ')[1 + ((y + (x * yGridAmount)) * 3)])
      {
        if (filling === 0 || filling === 1 || filling === 2)
        {
          for (let c = 0; c < goal.length; c++)
          {            
            if (goCheck[c] === false)
            {
              //a direction checks from all potential angles
              let dirCheck = [false, false, false, false, false, false, false, false]

              if (goal[c].charAt(0) === letters.charAt(6 + (9 * (y + (x * yGridAmount)))))
              { 
                for (let i = 1; i < goal[c].length; i++) 
                {
                  //checks if goal exist EAST wards
                  if (dirCheck[0] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * (y + ((x + i) * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[0] = true
                  }   
                  
                  //checks if goal exist SOUTH EAST wards
                  if (dirCheck[1] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * ((y + i) + ((x + i) * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[1] = true
                  }  

                  //checks if goal exist SOUTH wards
                  if (dirCheck[2] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * ((y + i) + (x * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[2] = true
                  }  

                  //checks if goal exist SOUTH WEST wards
                  if (dirCheck[3] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * ((y + i) + ((x - i) * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[3] = true
                  }  

                  //checks if goal exist WEST wards
                  if (dirCheck[4] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * (y + ((x - i) * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[4] = true
                  }   

                  //checks if goal exist NORTH WEST wards
                  if (dirCheck[5] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * ((y - i) + ((x - i) * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[5] = true
                  }  

                  //checks if goal exist NORTH wards
                  if (dirCheck[6] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * ((y - i) + ((x) * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[6] = true
                  }  

                  //checks if goal exist NORTH EAST wards
                  if (dirCheck[7] === false && goal[c].charAt(i) === letters.charAt(6 + (9 * ((y - i) + ((x + i) * yGridAmount)))))
                  {
                    if (i === goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[7] = true
                  }  
                  
                  if (goCheck[c] === true)
                  {
                    break;
                  }
                }
              }   
            }            
          };
        }
      }
      else
      {
        //informs the users that their is a problem with some grid boxs
        if (filling === 0)
        {
          alert('GRID BOX ' + x  + ', ' + y + ' error');
          breaker = true;
          break;
        }
        
        var ran;
        if (filling === 1 || filling === 3)
        {
          //adds random letters to the grid  
          if (countOccurrences(letters, String(x+', '+y+', ')) === 0)
          {
            if (puzzlet === 1)
            {
              ran = (Math.floor(Math.random() * (91 - 65)) + 65);
              addToGrid(String(x + ', ' + y  + ', ' + String.fromCharCode(ran).toUpperCase()), p5)
            }
            else if (puzzlet === 2)
            {
              addToGrid(String(x + ', ' + y  + ', ~'), p5)
            }
          }
        }
        else
        {
          //asks the user if they want the random gaps to be automatically filled
          if (window.confirm(x + ' ' + y + ' are empty grid boxes, do you want to randomly fill all the empty grid boxs')) 
          {
            if (countOccurrences(letters, String(x+', '+y+', ')) === 0)
            {
              ran = (Math.floor(Math.random() * (91 - 65)) + 65);
              addToGrid(String(x + ', ' + y  + ', ' + String.fromCharCode(ran).toUpperCase()), p5)
            }

            filling = 3
            window.txt = "You pressed OK!";
          } 
          else 
          {
            window.txt = "You pressed Cancel!";
            breaker = true;
            break;
          }
        }
      }
    }    
  }

  //checks if all goal checks are true
  if (filling === 2 || filling === 3)
  {
    for (let i = 0; i < goCheck.length; i++) 
    {
      //informs the user that they are missing some goals
      if (goCheck[i] === false)
      {
        alert(goal[i] + ' is cannot be found in your word searchs grid')
        break;
      }
      else if (i === goCheck.length - 1 && goCheck[i] === true)
      {
        //ask the user if they are finshed
        if (window.confirm("All goals are included within the word search, are you sure you are finished and want to upload")) 
        {
          window.txt = window.location.href = '/creFin';
        } 
        else 
        {
          window.txt = "You pressed Cancel!";
        }
      }
    }
  }

  //refreshes filling and goal check list
  filling = 0;
  goCheck = []
}

//does the final check of the wordsearch
function finalCheck(p5)
{
  filling = 2;

  //adds a check for each goal
  goal.forEach(go => 
  {
    goCheck.push(false);
  });

  checkAllGrid(p5);
}

function crossCheck()
{
  let breaker = false;

  //checks the x axis
  for(let x = 0; x < xGridAmount; x++)
  {
    //stops x when called
    if (breaker === true)
    {
      break;
    }
    
    //checks the y axis
    for(let y = 0; y < yGridAmount; y++)
    {    
      if (String(x) === letters.split(', ')[(x * yGridAmount) * 3] && String(y) === letters.split(', ')[1 + ((y + (x * yGridAmount)) * 3)])
      {

      }
      else 
      {
        if (filling === 3)
        {
          //adds random letters to the grid  
          if (countOccurrences(letters, String(x+', '+y+', ')) === 0)
          {
            addToGrid(String(x + ', ' + y  + ', ~'), pros)
          }
          else
          {
            //asks the user if they want the random gaps to be automatically filled
            if (window.confirm(x + ' ' + y + ' are empty grid boxes, do you want to randomly fill all the empty grid boxs')) 
            {
              if (countOccurrences(letters, String(x+', '+y+', ')) === 0)
              {
                addToGrid(String(x + ', ' + y  + ', ~'), pros);
              }
         
              filling = 3
              window.txt = "You pressed OK!";
            } 
            else 
            {
              window.txt = "You pressed Cancel!";
              breaker = true;
              break;
            }
          }
        }
      }
    }
  }
}