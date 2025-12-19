class player {
  //Constructor function that creates the player object
  constructor(image, gsLeft, gsRight) {
    this.x = mouseX - this.size / 2 //Player's X coordinate
    this.y = 510 //Player's Y coordinate
    this.size = 50 //Width & Height of the player
    this.image = image //Image that will be displayed to the user
    this.rightX = this.x + this.size //Right X of the player
    
    this.left = gsLeft //Left boundary of the game screen
    this.right = gsRight //Right boundary of the game screen

    this.gunY = this.y + 20 //Y level of the guns
    this.leftGunX = this.x + 5 //x value of left gun
    this.rightGunX = this.right - 20 //X value of right gun
  }

  //Function that updates the player's attributes
  update() {
    if ((mouseX - this.size / 2) < this.left) { //If the mouseX goes off the left side of the game screen
      this.x = this.left //Set the player's X coordinate to the left boundary
    } else if ((mouseX + this.size / 2) > this.right) { //If the mouseX goes off the right side of the game screen
      this.x = this.right - this.size //Set the player's X coordinate to the right boundary
    } else {
      this.x = mouseX - this.size / 2 //Set the player's X coordinate to the mouseX
    }
    
    //Update attributes
    
    this.rightX = this.x + this.size //Right X of the player
    
    this.rightGunX = this.rightX - 10 //Right boundary of the player's gun
    this.leftGunX = this.x + 5 //Left boundary of the player's gun
    
    
    
    image(this.image, this.x, this.y, this.size, this.size) //Draws the player image
    
    /*fill(255)                                //draws the location of the player's guns
    rect(this.leftGunX, this.leftGunY, 5, 5)
    rect(this.rightGunX, this.rightGunY, 5, 5)*/
  }

  getLeftGunX() {
    return this.leftGunX
  }

  getRightGunX() {
    return this.rightGunX
  }

  getGunY() {
    return this.gunY
  }

}