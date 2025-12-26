  //Variables
let gameName = "Driving Theory Space Invaders" //Name of the game
let gameNameWidth
let currentTime = 0 //Current time in milliseconds
let score = 0
//Canvas Properties
let canvasWidth = 1600
let canvasHeight = 900
let canvasCenter = canvasWidth / 2
let homeBgColour = "#02042e" //home background colour
let gamePageBgColour = "#474747" //game page background colour
let gameScreenBgColour = "#010217" //game screen background colour
let goScreenBgColour = "#8c1900" // game over screen background colour

let currentPage//Current Page that is being displayed to the user

//Home Page Variables
//Start Button Properties
let startBtnX = 650
let startBtnY = 500
let startBtnWidth = 300
let startBtnHeight = 50
let startBtnCir = 15

//Game Page Variables
//Game Screen Properties
let health = 100 //Player Health Value

let screenMargin = 100 //Gap between game and question screen
let gameScreenWidth = 600
let gameScreenHeight = 500
let gameScreenX = canvasCenter - (screenMargin / 2) - gameScreenWidth //X position of the game screen
let gameScreenY = 80 //Y position of the game screen
let gameScreenRX = gameScreenX + gameScreenWidth //Right X of game screen
let gameScreenBY = gameScreenY + gameScreenHeight //Bottom Y of game screen

//Question Screen Properties
let questionScreenWidth = 600
let questionScreenHeight = 500
let questionScreenX = canvasCenter + (screenMargin / 2) //X position of the question screen
let questionScreenY = 80 //Y position of the question screen

//Question handling variables
let isQuestionAnswered = true; // Track if the current question has been answered
let currentQuestion; // Store the current question object
let currentAnswers = []; // Store the shuffled answers
let selectedAnswerIndex = -1; // Index of the selected answer

let qBoxBlueText //Content in the blue question blox
let qBoxRedText //Content in the red question blox
let qBoxGreenText //Content in the green question blox
let qBoxYellowText //Content in the yellow question blox

//Bullet Variables
let bullets = []
let bulletCooldown = 350
let lastBulletFired = 0

//Alien Variables
let aliens = []
let alienWidth
let alienHeight

//Enter any values that need to be preloaded here
function preload() {
  //Fonts
  gameTitleFont = loadFont("Assets/Fonts/SpaceCrusader.ttf")
  btnFont = loadFont("Assets/Fonts/SpaceCorner.ttf")
  answerFont = loadFont("Assets/Fonts/SpaceTruckin.ttf")
  
  //Images
  playerImage = loadImage("Assets/Images/Spaceship.png")
  bulletImage = loadImage("Assets/Images/SpaceshipBullet.png")
  alienImage = loadImage("Assets/Images/AlienSprite.png")

  //Question Box images
  BlueQBImage = loadImage("Assets/Images/QuestionBoxes/BlueQB.png")
  GreenQBImage = loadImage("Assets/Images/QuestionBoxes/GreenQB.png")
  RedQBImage = loadImage("Assets/Images/QuestionBoxes/RedQB.png")
  YellowQBImage = loadImage("Assets/Images/QuestionBoxes/YellowQB.png")

  //Sound Effects
  alienDeathSFX = loadSound("Assets/Sounds/AlienDeathSound.wav")
  alienSpawnSFX = loadSound("Assets/Sounds/AlienSpawnSound.mp3")
  alienSpawnSFX.setVolume(0.1) // Set the volume to 10%
  gunFireSFX = loadSound("Assets/Sounds/GunFireSound.mp3")
  

  //JSON
  loadQuestions();
}

//The initial setup of the program
function setup() {
  createCanvas(canvasWidth, canvasHeight) //Creates the canvas with the specified width and height
  currentPage = "home" //Sets the page to home

  player = new player(playerImage, gameScreenX, gameScreenRX) //Creates a new player object
  //bullet = new bullet(bulletImage, 200, 500, 10) //Creates a new bullet object
  //spawnAlienGrid(getRandomInt(1, 3), getRandomInt(3, 8))

  console.log("gsx: " + gameScreenX)
}

function draw() {
  currentTime = millis() //Current time in milliseconds
  //Switch-case statement to determine which page to display
  switch (currentPage) {
    //Home page
    case "home":
      drawHomePage() //Calls draw home page function
    break;
      
    //Gameplay page
    case "game":
      drawGamePage() //Calls draw game page function
    break;

    //Game Over Page
    case "gameover":
      drawGameOverPage()
    break;
  }
}

function drawHomePage() { //function that contains the home page
  background(homeBgColour)

  //Title Text
  fill(255)
  textFont(gameTitleFont)
  textSize(150)
  text(gameName, (canvasWidth / 2) - (textWidth(gameName) / 2), 200)

  
  //Start Button
  rect(startBtnX, startBtnY, startBtnWidth, startBtnHeight, startBtnCir) //Draw Start Button
  textSize(30) // set the text size 
  textFont(btnFont) // Set the text font 
  fill(0)
  text("Click to Start", startBtnX + (startBtnWidth / 2) - (textWidth("Click to Start") / 2), 535, startBtnWidth - 20) //Creates the text "Click to start" in the middle of the button
  
  if(mouseX >= startBtnX 
     && mouseX <= startBtnX + startBtnWidth 
     && mouseY >= startBtnY 
     && mouseY <= startBtnY + startBtnHeight 
     && mouseIsPressed == true) { 
    setPage("game")
  } //If left click is pressed, while the mouse is over the start button, set the current page to game

}

function drawGamePage() { //function that contains the game page
  background(gamePageBgColour)
  fill(255)
  noCursor()
  
  //Question Window 
  //Note to self: 6 degrees
  fill(gameScreenBgColour)
  rect(questionScreenX, questionScreenY, questionScreenWidth, questionScreenHeight, 5)

  //AnswerBoxes
  image(BlueQBImage, questionScreenX, questionScreenY + 70, questionScreenWidth / 2, questionScreenHeight / 2)
  image(RedQBImage, questionScreenX + (questionScreenWidth / 2), questionScreenY + 100, questionScreenWidth / 2, questionScreenHeight / 2)
  image(GreenQBImage, questionScreenX, questionScreenY + (questionScreenHeight / 2), questionScreenWidth / 2, questionScreenHeight / 2)
  image(YellowQBImage, questionScreenX + (questionScreenWidth / 2), questionScreenY + (questionScreenHeight / 2) + 30, questionScreenWidth / 2, questionScreenHeight / 2)

  //Game Window
  fill(gameScreenBgColour)
  rect(gameScreenX, gameScreenY, gameScreenWidth, gameScreenHeight, 5)

  
  //Player health bar
  fill(0, 0, 150)
  rect(gameScreenX, 700, gameScreenWidth, 50, 10) //Draws a blue rectangle behind red
  fill(255, 255, 255)
  rect(gameScreenX, 700, gameScreenWidth * (health/100), 50, 10)//Draws a red rectangle on top of the blue one, with an adaptive width to represent the player's health

  //Sets the value of each answer
  qBoxBlueText = currentAnswers[0] //1
  qBoxRedText = currentAnswers[1] //2
  qBoxGreenText = currentAnswers[2] //3
  qBoxYellowText = currentAnswers[3] //4

  if (isQuestionAnswered === false) { //Displays the questions if the question has not been answered
    fitMultiLineText(currentQuestion.question, questionScreenX + questionScreenWidth / 2, questionScreenY + 40, questionScreenWidth - 40, 50, 0, "#D3D3D3", 36, answerFont)
    
    fitMultiLineText(qBoxBlueText, 1000, 225, 225, 110, 5, "#074261", 32, answerFont) //Blue
    fitMultiLineText(qBoxRedText, 1300, 255, 220, 110, 5, "#4f0704", 32, answerFont) //Red
    fitMultiLineText(qBoxGreenText, 1000, 410, 220, 110, 5, "#0f5104", 32, answerFont) //Green
    fitMultiLineText(qBoxYellowText, 1300, 440, 220, 110, 5, "#7f8701", 32, answerFont) //Yellow
  }
  
  fitMultiLineText("Score: " + score, 1000, 700, 200, 50, 0, "#D3D3D3", 36, answerFont) //Score Text
  
   //console.log("MouseX: " + mouseX + " MouseY: " + mouseY) //displays mouseX and Y in console
  
  
  //Fire Bullets
  if(mouseIsPressed == true && currentTime - lastBulletFired > bulletCooldown) {
    //Creates a new bullet object for the left gun
    bullets.push(new bullet(bulletImage, player.getLeftGunX(), player.getGunY(), 12.5)) 
    //Creates a new bullet object for the right gun
    bullets.push(new bullet(bulletImage, player.getRightGunX(), player.getGunY(), 12.5)) 
    //Sets the last bullet fired to the current time
    gunFireSFX.play() //Plays the gun fire sound effect
    lastBulletFired = currentTime
  }


  //Update Objects
  player.update()

  //Update Each Bullet
  for (let i = 0; i < bullets.length; i++) { //Loops through the bullets array
    //Sets the bullet's hit attribute to true if it goes off screen
    if (bullets[i].getY() < gameScreenY) {
      bullets[i].setHit(true) //Sets the bullet's hit attribute to true
    }
    //Checks if bullet hits an alien
    for (let j = 0; j < aliens.length; j++) {
      if (bullets[i].getX() >= aliens[j].getX() && bullets[i].getX() <= aliens[j].getRX() && bullets[i].getY() >= aliens[j].getY() && bullets[i].getY() <= aliens[j].getBY()) { 
        bullets[i].setHit(true) //Sets the bullet's hit attribute to true

        aliens[j].dealDamage(bullets[i].getDamage()) //Deals damage to the alien
      }
    }
    //Updates the bullet if not hit
    if (bullets[i].getHit() == false) { //If the bullet has not been hit
      bullets[i].update() //Updates each bullet object
    } else { //If the bullet has been hit
      bullets.splice(i, 1) //Removes the bullet from the array
      i-- //Decrements i by 1 so that the loop doesn't skip an element
    }
  }

  //Update Each Alien
  if (aliens.length <= 0) {
    spawnAlienGrid(getRandomInt(1, 3), getRandomInt(3, 6)) //Spawns new alien grid with random cols/rows
  }
  
  for (let i = 0; i < aliens.length; i++) { //Loops through the aliens array
    //console.log("Alien no:Y   -  ", i, " : ", aliens[i].getY())
    if ((aliens[i].getY() + aliens[i].getHeight()) > gameScreenBY) { //Checks if the alien touches the bottom of the game screen
      health -= aliens[i].getDamage() //Subtracts the value of the damage attribute to the health variable
      aliens.splice(i, 1) //Removes the alien from the array
      break; //Breaks out of the for loop
    }
    if (aliens[i].getHealth() <= 0) {
      aliens.splice(i, 1) //Removes the alien from the array
      score += 1 //Increases the score by 1
      alienDeathSFX.play() //Plays the alien death sound effect
      break; //Breaks out of the for loop
    } else {
      aliens[i].update() //Updates the attributes of the alien
    }
  }


  //Checks if the health is below or = to 0

  if (health <= 0) {
    currentPage = "gameover"
  }
}

function drawGameOverPage() { //function that draws the game over page
  cursor()
  background(goScreenBgColour)

  fill(255)
  textFont(gameTitleFont)
  textSize(250)
  text("GAME OVER", (canvasWidth / 2) - (textWidth("GAME OVER") / 2), 200)
  
  //Button Rect
  rect(startBtnX, startBtnY, startBtnWidth, startBtnHeight, startBtnCir)
  
  //ButtonTextAttributes
  textSize(30)
  textFont(btnFont) 
  fill(0)
  text("Click to Restart", startBtnX + (startBtnWidth / 2) - (textWidth("Click to Restart") / 2), 535, startBtnWidth - 20) 
  //Creates the text "Click to restart" in the middle of the button

  //Refreshes the page, letting the user restart the game.
  if(mouseX >= startBtnX 
    && mouseX <= startBtnX + startBtnWidth 
    && mouseY >= startBtnY 
    && mouseY <= startBtnY + startBtnHeight 
    && mouseIsPressed == true) { 
   refreshPage()
 }
}

function spawnAlienGrid(rows, cols) {
  
  // Clear existing aliens array
    aliens = [];

    // Alien and grid properties
    let alienWidth = 30; // Width of each alien
    let alienHeight = 22; // Height of each alien
    let verticalSpacing = 30; // Vertical spacing between rows
    let totalHorizontalMargin = 60; // Total horizontal margin (30 pixels on each side)

    // Calculate game screen width for alien placement
    let availableWidth = gameScreenWidth - totalHorizontalMargin;

    // Calculate spacing based on the number of columns
    let horizontalSpacing = (availableWidth - (cols * alienWidth)) / (cols - 1);

    // Calculate starting X and Y positions for the grid
    let startX = gameScreenX + 30; // Left margin of 30 pixels
    let startY = gameScreenY + 50; // Start Y position, adjust as needed
  
    // Loop through rows and cols to position each alien
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = startX + j * (alienWidth + horizontalSpacing);
            let y = startY + i * (alienHeight + verticalSpacing);
            //pushes alien object to aliens[] array
            aliens.push(new Alien(x, y, gameScreenX, gameScreenRX, alienImage)); 
        }
    }
  alienSpawnSFX.play() //Plays the alien spawn sound effect
}

function displayNewQuestion() {
  if (!isQuestionAnswered) {
    console.error("The current question has not been answered yet.");
    return;
  }

  currentQuestion = getRandomQuestion(); // Get a new question
  currentAnswers = getAllAnswers(currentQuestion); // Shuffle and store the answers
  selectedAnswerIndex = -1; // Reset selected answer
  isQuestionAnswered = false; // Mark the question as unanswered

}

function checkAnswer(selectedAnswer) {
  let correctAnswer = getCorrectAnswer(currentQuestion);

  if (selectedAnswer === correctAnswer) {
    console.log("Correct Answer");
    score += 1; // Increase score if correct 
  } else {
    console.log("Incorrect Answer ");
  }

  isQuestionAnswered = true; // Mark the question as answered
}

function keyPressed() {
  if (!isQuestionAnswered && (key === '1' || key === '2' || key === '3' || key === '4')) {
    selectedAnswerIndex = int(key) - 1; // Convert key to index (1 -> 0, 2 -> 1, etc.)

    let selectedAnswer = currentAnswers[selectedAnswerIndex];
    console.log("Selected Answer: ", selectedAnswer);

    checkAnswer(selectedAnswer); // Check if the selected answer is correct
  }

  if (key === 'u' || key === 'U') {
    displayNewQuestion(); // Create a new question when 'u' is pressed
  }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPage(page) {
  currentPage = page //Sets the current page to the specified page
}

function refreshPage() {
  location.reload(); // Reloads the current page
}