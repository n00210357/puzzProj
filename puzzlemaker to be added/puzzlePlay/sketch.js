//GRID VARS
//grid box size
let boxSize = 50;

//the length of the grid
let xGridAmount = 10;
let yGridAmount = 10;

//the holds the cords for selected boxs
let recX = 0;
let recY = 0;

//MOUSE VARS
//stores if user clicked
let clicked = false;


//CANVAS VARS
//A allows the canvase to be referenced
let canvas;
let border = 100;

//gets sketch size
let xSketchSize = (boxSize * xGridAmount) + border * 2;
let ySketchSize = (boxSize * yGridAmount) + border * 2;


//DATA VARS
let letters = "0, 0, A, 0, 1, C, 0, 2, E, 0, 3, X, 0, 4, D, 0, 5, F, 0, 6, M, 0, 7, F, 0, 8, S, 0, 9, G, 1, 0, G, 1, 1, T, 1, 2, I, 1, 3, T, 1, 4, G, 1, 5, S, 1, 6, O, 1, 7, G, 1, 8, X, 1, 9, Q, 2, 0, J, 2, 1, D, 2, 2, A, 2, 3, X, 2, 4, P, 2, 5, C, 2, 6, B, 2, 7, Z, 2, 8, L, 2, 9, S, 3, 0, I, 3, 1, C, 3, 2, I, 3, 3, C, 3, 4, C, 3, 5, V, 3, 6, E, 3, 7, X, 3, 8, A, 3, 9, H, 4, 0, G, 4, 1, O, 4, 2, D, 4, 3, L, 4, 4, B, 4, 5, I, 4, 6, Z, 4, 7, F, 4, 8, S, 4, 9, Y, 5, 0, M, 5, 1, C, 5, 2, G, 5, 3, C, 5, 4, Q, 5, 5, K, 5, 6, L, 5, 7, P, 5, 8, G, 5, 9, E, 6, 0, W, 6, 1, W, 6, 2, A, 6, 3, A, 6, 4, K, 6, 5, S, 6, 6, N, 6, 7, D, 6, 8, O, 6, 9, G, 7, 0, B, 7, 1, T, 7, 2, D, 7, 3, T, 7, 4, G, 7, 5, S, 7, 6, C, 7, 7, F, 7, 8, P, 7, 9, E, 8, 0, E, 8, 1, A, 8, 2, X, 8, 3, V, 8, 4, C, 8, 5, T, 8, 6, W, 8, 7, D, 8, 8, O, 8, 9, E, 9, 0, E, 9, 1, P, 9, 2, G, 9, 3, C, 9, 4, V, 9, 5, S, 9, 6, E, 9, 7, Q, 9, 8, E, 9, 9, B"
let goal = ["BEE", "CAT", "DOG"];
let goCheck = []
let lines = [];
let newLine = false;
let completion = true;


//draws once at start
function setup() 
{
  //draws sketch
  canvas = createCanvas(xSketchSize, ySketchSize);
  canvas.position(100, 100);

  goal.forEach(go => 
  {
    goCheck.push(false);    
  });
}

//draws every frame
function draw() 
{
  //moves the text over to the left
  textAlign(LEFT);
  fill(0)

  //refreshs the background
  background(220);

  //adds the letters to the grid
  wordFiller();

  //highlights a boxs if the mouse is over it or clicked
  if (mouseX >= (0 + border) && mouseX <= (width - border) && mouseY >= (0 + border) && mouseY <= (height - border) || clicked == true )
  {    
    fill(150);
    //draws the square to darken
    rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
  
    fill(0)
    textSize(32);
    textAlign(CENTER, CENTER);
    //console.log(letters.charAt(6 + (9 * ((recY - 2) + ((recX - 2) * ((yGridAmount - 1) * (yGridAmount - 1)))))))

    text(letters.charAt(6 + (9 * ((recY - 2) + ((recX - 2) * yGridAmount)))),
        (recX - 2) * boxSize + border + (boxSize / 2), 
        (recY - 2) * boxSize + border + (boxSize / 2))
    
    //checks if clicked of just hovering over
    if (clicked == false)
    {
      fill(150);
    }
    else if (clicked == true)
    {
      searcher()
    }
  }  

  //draws the outline
  outline();
  fill(255)
  textSize(12)
  text(letters, 2, 650, 700)

  //draws all the words in the goal
  completion = true  
  for(i = 0; i < goal.length; i++)
  {
    textSize(20);
    textAlign(LEFT, CENTER);
    fill(255);
    text(i, width - border, border + i * 40 + 20);
    text(goal[i], width - border + 20, border + i * 40 + 20);

    if (goCheck[i] == true)
    {
      fill(0);
      strokeWeight(5);
      line(width - border + 20, border + i * 40 + 20, width, border + i * 40 + 20);
    }
    else
    {
      completion = false
    }

    if (i == (goal.length - 1) && goCheck[i] == true && completion == true)
    {
      console.log("Victory")
    }

    strokeWeight(0.25);
  }
}

//produces the outline
function outline()
{
  textAlign(LEFT);

  //outlines the grids
  fill(0);
  for(x = 0; x < xGridAmount; x++)
  {
    //draws the xAxis outlines
    rect(x * boxSize + border, 0 + border, 1, yGridAmount * boxSize);

    //detects which x grid the mouse is hovering over
    if (Math.trunc(((mouseX - border) / boxSize)) == x && clicked == false)
    {
      recX = x + (border / boxSize);
    }

    for(y = 0; y < yGridAmount; y++)
    {
      //draws the yAxis outlines
      rect(0 + border, y * boxSize + border, xGridAmount * boxSize, 1);

      //detects which y grid the mouse is hovering over
      if (Math.trunc((mouseY - border) / boxSize) == y && clicked == false)
      {
        recY = y + (border / boxSize);
      }

      //draws the grid number in to their grid
      fill(0);
      textSize(8);
      text(x + " " + y, x * boxSize + 6 + border, y * boxSize + 9 + border)
    }
  }

  //creates borders
  fill(0)
  rect(0, 0, xSketchSize, border)
  rect(0, 0, border, ySketchSize)
  rect(width - border, 0, border, ySketchSize)
  rect(0, height - border, xSketchSize, border)

  stroke('black');
  strokeWeight(5);

  for(i = 0; i <= lines.length / 4; i++)
  {
    line((lines[i * 4] * boxSize) + border + (boxSize / 2), (lines[1 + (i * 4)] * boxSize) + border + (boxSize / 2), (lines[2 + (i * 4)] * boxSize) + border + (boxSize / 2), (lines[3 + (i * 4)] * boxSize) + border + (boxSize / 2));
  }

  stroke(0);
  strokeWeight(0.25);
}

//inserts the users letters
function wordFiller()
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

//checks to see if the user has clicked
function mousePressed()
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

function mouseReleased()
{
  if (clicked == true && mouseX >= (0 + border) && mouseX <= (width - border) && mouseY >= (0 + border) && mouseY <= (height - border))
  {
    newLine = true;
  }
}

//hightlights the letters
function searcher()
{
  stroke('black');
  strokeWeight(5);

  line(recX * boxSize + (boxSize / 2),
       recY * boxSize + (boxSize / 2), 
       mouseX, 
       mouseY)

  if (newLine == true)
  {
    let lengthX = int((mouseX - border) / boxSize) - (recX - 2);
    let lengthY = int((mouseY - border) / boxSize) - (recY - 2);

    if (lengthX < 0)
    {
      lengthX = lengthX * -1
    }

    if (lengthY < 0)
    {
      lengthY = lengthY * -1
    }

    const start = 6 + (9 * ((recY - 2) + ((recX - 2) * yGridAmount)));
    const end = 6 + (9 * (int((mouseY - border) / boxSize) + (int((mouseX - border) / boxSize) * yGridAmount)));
    let exitFor = false;

    for (let c = 0; c < goal.length; c++)
    {  
      if (goCheck[c] == false && exitFor == false)    
      { 
        if (goal[c].charAt(0) == letters.charAt(start) || goal[c].charAt(0) == letters.charAt(end))
        {  
          if (recY - 2 == int((mouseY - border) / boxSize))
          {
            if ((goal[c].length - 1) == lengthX)
            {
              let breaker = false;
              for (let i = 1; i < goal.length; i++)
              {
                if ((goal[c].charAt(goal.length - 1) == letters.charAt(end) || goal[c].charAt(goal.length - 1) == letters.charAt(start)) && breaker == false && goal[c].charAt(i) == letters.charAt(6 + (9 * ((recY - 2) + (((recX - 2) + i) * yGridAmount)))))
                {
                  if (i = goal[c].length - 1)
                  {
                    goCheck[c] = true
                    lines.push(recX - 2,
                      recY - 2, 
                      int((mouseX - border) / boxSize), 
                      int((mouseY - border) / boxSize))
                    newLine = false;
                    clicked = false;
                    exitFor = true;
                  }
                }
                else
                {
                  breaker = true
                }
              } 
            }         
          }
        }
        
        
        if ((goal[c].charAt(0) == letters.charAt(start) || goal[c].charAt(0) == letters.charAt(end)) && goCheck[c] == false)
        {
          if (recY - 2 == int((mouseY - border) / boxSize))
          {
            if ((goal[c].length - 1) == lengthX)
            {
              let breaker = false;
              for (let i = 1; i < goal.length; i++)
              {
                if ((goal[c].charAt(goal.length - 1) == letters.charAt(end) || goal[c].charAt(goal.length - 1) == letters.charAt(start)) && breaker == false && goal[c].charAt((goal.length - 1) - i) == letters.charAt(6 + (9 * ((recY - 2) + (((recX - 2) - i) * yGridAmount)))))
                {
                  if (i = goal.length - 1)
                  {
                    goCheck[c] = true
                    lines.push(recX - 2,
                      recY - 2, 
                      int((mouseX - border) / boxSize), 
                      int((mouseY - border) / boxSize))
                      newLine = false;
                      clicked = false;
                      exitFor = true;
                  }
                }
                else
                {
                  breaker = true
                }
              } 
            }         
          }
        }   

        
        if ((goal[c].charAt(0) == letters.charAt(start) || goal[c].charAt(0) == letters.charAt(end)) && goCheck[c] == false)
        {
          if (recX - 2 == int((mouseX - border) / boxSize))
          {
            if ((goal[c].length - 1) == lengthY)
            {
              let breaker = false;
              for (let i = 1; i < goal.length; i++)
              {
                if ((goal[c].charAt(goal.length - 1) == letters.charAt(end) || goal[c].charAt(goal.length - 1) == letters.charAt(start)) && breaker == false && goal[c].charAt(i) == letters.charAt(6 + (9 * (((recY - 2) + i) + ((recX - 2) * yGridAmount)))))
                {                  
                  if (i = goal.length - 1)
                  {
                    goCheck[c] = true
                    lines.push(recX - 2,
                      recY - 2, 
                      int((mouseX - border) / boxSize), 
                      int((mouseY - border) / boxSize))
                      newLine = false;
                      clicked = false;
                      exitFor = true;
                  }
                }
                else
                {
                  breaker = true
                }
              } 
            }         
          }
        } 

        if ((goal[c].charAt(0) == letters.charAt(start) || goal[c].charAt(0) == letters.charAt(end)) && goCheck[c] == false)
        {
          if (recX - 2 == int((mouseX - border) / boxSize))
          {
            if ((goal[c].length - 1) == lengthY)
            {
              let breaker = false;
              for (let i = 1; i < goal.length; i++)
              {
                if ((goal[c].charAt(goal.length - 1) == letters.charAt(end) || goal[c].charAt(goal.length - 1) == letters.charAt(start)) && breaker == false && goal[c].charAt((goal.length - 1) - i) == letters.charAt(6 + (9 * (((recY - 2) - i) + ((recX - 2) * yGridAmount)))))
                {
                  if (i = goal.length - 1)
                  {
                    goCheck[c] = true;
                    lines.push(recX - 2,
                      recY - 2, 
                      int((mouseX - border) / boxSize), 
                      int((mouseY - border) / boxSize))
                      newLine = false;
                      clicked = false;
                      exitFor = true;
                  }
                }
                else
                {
                  breaker = true
                }
              } 
            }         
          }
        } 

        if ((goal[c].charAt(0) == letters.charAt(start) || goal[c].charAt(0) == letters.charAt(end)) && goCheck[c] == false)
        {
          if (recX - 2 != int((mouseX - border) / boxSize) && recY - 2 != int((mouseY - border) / boxSize))
          {
            if ((goal[c].length - 1) == lengthY && (goal[c].length - 1) == lengthX)
            {
              let breaker1 = false;
              let breaker2 = false;
              for (let i = 0; i < goal.length; i++)
              {                      
                if ((goal[c].charAt(goal.length - 1) == letters.charAt(end) || goal[c].charAt(goal.length - 1) == letters.charAt(start)) && breaker1 == false && goal[c].charAt((goal.length - 1) - i) == letters.charAt(6 + (9 * (((recY - 2) - i) + (((recX - 2) - i) * yGridAmount)))))
                {
                  if (i = goal.length - 1 && goal[c].charAt(goal[c].length - 1))
                  {
                    goCheck[c] = true;
                    lines.push(recX - 2,
                      recY - 2, 
                      int((mouseX - border) / boxSize), 
                      int((mouseY - border) / boxSize))
                      newLine = false;
                      clicked = false;
                      exitFor = true;
                  }
                }
                else
                {
                  breaker1 = true
                }

                if ((goal[c].charAt(goal.length - 1) == letters.charAt(end) || goal[c].charAt(goal.length - 1) == letters.charAt(start)) && breaker2 == false && goal[c].charAt(0) == letters.charAt(6 + (9 * (((recY - 2) - i) + (((recX - 2) - i) * yGridAmount)))))
                {
                  if (i = goal.length - 1 && goal[c].charAt(0))
                  {
                    goCheck[c] = true;

                    lines.push(recX - 2,
                      recY - 2, 
                      int((mouseX - border) / boxSize), 
                      int((mouseY - border) / boxSize))
                      newLine = false;
                      clicked = false;
                      exitFor = true;
                  }
                }
                else
                {
                  breaker2 = true
                }
              }
            }    
          }      
        }
      }
      else if (exitFor == true)
      {
        break;
      }
    }
  }

  stroke(0);
  strokeWeight(0.25);
}

//counts the amount of symbols
function countOccurrences(string, subString) 
{
  // Escape special characters in the subString to avoid regex interpretation
  const escapedSubString = subString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Create a regular expression with the escaped subString and the global flag
  const regex = new RegExp(escapedSubString, 'g');
  // Use match() to find all occurrences of the subString in the string
  const matches = string.match(regex);
  // Return the number of matches found
  return matches ? matches.length : 0;
}