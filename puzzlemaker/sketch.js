let canvas;
let boxSize = 40;
let x = 0;
let y = 0;
let recX = 0;
let recY = 0;
let clicked = false;
let letters = "0, 0, a, 1, 0, b, 0, 1, c, "

function setup() 
{
  canvas = createCanvas(400, 400);
  canvas.position(100, 100);
}

function draw() 
{
  textAlign(LEFT);

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)
  {
    background(220);

    if (clicked == false)
    {
      fill(200);
    }
    else
    {
      fill(150);
    }

    rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
  }


  fill(0);
  for(x = 0; x < width / boxSize; x++)
  {
    rect(x * boxSize, 0, 1, height);
    if (Math.trunc(mouseX / boxSize) == x && clicked == false)
    {
      recX = x;
    }

    for(y = 0; y < height / boxSize; y++)
    {
      rect(0, y * boxSize, width, 1);
      textSize(8);
      text(x + " " + y, x * boxSize + 2, y * boxSize + 9)

      if (Math.trunc(mouseY / boxSize) == y && clicked == false)
      {
        recY = y;
      }

      textSize(8);
      text(x + " " + y, x * boxSize + 2, y * boxSize + 9)
    }
  }

  workFiller();
}

function mousePressed()
{
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)
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

function workFiller()
{  
  for(i = 0; i < countOccurrences(letters, ', ') / 3; i++)
  {
    let z = i * 3
    console.log(i)
    textSize(32);
    textAlign(CENTER, CENTER);
    text(letters.split(', ')[2 + z].toUpperCase(), 
    Math.floor(letters.split(', ')[0 + z]) * (boxSize) + (boxSize / 2), 
    Math.floor(letters.split(', ')[1 + z]) * (boxSize) + (boxSize / 2))
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