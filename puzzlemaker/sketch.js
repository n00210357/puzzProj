//GRID VARS
//grid box size
let boxSize = 50;

//the length of the grid
let xGridAmount = 10
let yGridAmount = 10

//the holds the cords for selected boxs
let recX = 0;
let recY = 0;


//MOUSE VARS
//stores if user clicked
let clicked = false;


//CANVAS VARS
//A allows the canvase to be referenced
let canvas;
let border = 100

//gets sketch size
let xSketchSize = (boxSize * xGridAmount) + border * 2
let ySketchSize = (boxSize * yGridAmount) + border * 2


//CROSSWORD
//string that holds the placed in letters
let selectedGoal = -1
let letters = "0, 0, a, 1, 0, b, 0, 1, c, 1, 1, d, 0, 2, e, 0, 5, f, 0, 9, g"
let goal = ["bee", "cat", "dog"]
let inputBox 
let deleteBut
let insertBut

//draws once at start
function setup() 
{
  //draws sketch
  canvas = createCanvas(xSketchSize, ySketchSize);
  canvas.position(100, 100);
  inputBox = createInput('');
  deleteBut = createButton('delete')
  insertBut = createButton('insert into goal')
}

//draws every frame
function draw() 
{
  //moves the text over to the left
  textAlign(LEFT);

  //highlights a boxs if the mouse is over it or clicked
  if (mouseX >= (0 + border) && mouseX <= (width - border) && mouseY >= (0 + border) && mouseY <= (height - border))
  {
    //refreshs the background
    background(220);

    //checks if clicked of just hovering over
    if (clicked == false)
    {
      fill(200);
    }
    else if (clicked == true && selectedGoal == -1)
    {
      fill(150);
    }

    //draws the square to darken
    rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
  }

  //draws the outline
  outline()
  workFiller();
  puzzleKey();

  textSize(12);
  text(letters, width / 2, height - border / 2)

  if (clicked && selectedGoal == -1)
  {
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
    {
      addToGrid()
    }
  }
}

//produces the outline
function outline()
{
  //outlines the grids
  fill(0);
  for(x = 0; x < xGridAmount; x++)
  {
    //draws the xAxis outlines
    rect(x * boxSize + border, 0 + border, 1, yGridAmount * boxSize);

    //detects which x grid the mouse is hovering over
    if (Math.trunc(((mouseX - border) / boxSize)) == x && clicked == false && selectedGoal == -1)
    {
      recX = x + (border / boxSize);
    }

    for(y = 0; y < yGridAmount; y++)
    {
      //draws the yAxis outlines
      rect(0 + border, y * boxSize + border, xGridAmount * boxSize, 1);

      //detects which y grid the mouse is hovering over
      if (Math.trunc((mouseY - border) / boxSize) == y && clicked == false && selectedGoal == -1)
      {
        recY = y + (border / boxSize);
      }

      //draws the grid number in to their grid
      fill(0);
      textSize(8);
      text(x + " " + y, x * boxSize + 6 + border, y * boxSize + 9 + border)
    }
  }

  if (clicked == false)
  {
    selectedGoal = -1
  }
}

function addToGrid()
{
  console.log(String(recX - 2,),", ", String(recY - 2),", ", String.fromCharCode(keyCode))
  clicked = false
}

//checks to see if the user has clicked
function mousePressed()
{
  if (mouseX >= (0 + border) && mouseX <= (width - border) && mouseY >= (0 + border) && mouseY <= (height - border))
  {
    if (clicked == false)
    {
      clicked = true;
    }
    else
    {
      clicked = false;
    }
  }
}

//draws the border and the puzzle key
function puzzleKey()
{
  //creates borders
  fill(0)
  rect(0, 0, xSketchSize, border)
  rect(0, 0, border, ySketchSize)
  rect(width - border, 0, border, ySketchSize)
  rect(0, height - border, xSketchSize, border)

  //draws currently assign goal
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);  
  for(i = 0; i < goal.length; i++)
  {
    goalSelect(i)
    text(i, width - border, border + i * 40 + 20)
    text(goal[i], width - border + 20, border + i * 40 + 20)
    fill(255)
  }

  //draws the input and delete from goal inputs
  inputBox.position(width - border + 40 + 20, border + goal.length * 40 + 100);
  insertBut.position(width, border + (goal.length + 1) * 40 + 100);
  deleteBut.position(width, border + (goal.length + 2) * 40 + 100);

  //inserts if text box not empty
  if (inputBox.value() != "" && inputBox.value() != null)
  {
    insertBut.mousePressed(addToGoal)
  }  

  console.log(goal[selectedGoal])
  if (selectedGoal >= 0 && selectedGoal <= goal.length - 1)
  {
    deleteBut.mousePressed(removeFromGoal)
  }  
}

//select a goal with the mouse
function goalSelect(i)
{
  if (mouseX >= (width - border + 20) && mouseY >= (border + i * 40 + 20 / 2) && mouseY <= (20 + (border + i * 40 + 20 / 2)))
  {
    if (clicked == false)
    {
      clicked = true;
      selectedGoal = i
    }
    else
    {
      clicked = false;
    }
  }

  if (selectedGoal == i)
  {
    fill(255, 255, 0);
  }
}

//adds a new goal
function addToGoal()
{
  append(goal, inputBox.value())
}

//removes a selected goal
function removeFromGoal()
{
  let newGoal = []

  goal.forEach(sel => {
    if (sel != goal[selectedGoal])
    {
      newGoal.push(sel)
    }
  });

  newGoal.push(goal[selectedGoal])
  newGoal.pop();
  goal = newGoal;
}

//inserts the users letters
function workFiller()
{  
  //goes through the storage string to grab the letters and their cords
  for(i = 0; i < countOccurrences(letters, ', ') / 3; i++)
  {
    let z = i * 3
    textSize(32);
    textAlign(CENTER, CENTER);
    text(letters.split(', ')[2 + z].toUpperCase(), 
    Math.floor(letters.split(', ')[0 + z]) * (boxSize) + (boxSize / 2) + border, 
    Math.floor(letters.split(', ')[1 + z]) * (boxSize) + (boxSize / 2) + border)
  }
}

function countOccurrences(string, subString) {
  // Escape special characters in the subString to avoid regex interpretation
  const escapedSubString = subString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Create a regular expression with the escaped subString and the global flag
  const regex = new RegExp(escapedSubString, 'g');
  // Use match() to find all occurrences of the subString in the string
  const matches = string.match(regex);
  // Return the number of matches found
  return matches ? matches.length : 0;
}