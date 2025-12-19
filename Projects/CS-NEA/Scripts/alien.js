class Alien {
  constructor(startX, startY, gsLeft /*Left boarder*/, gsRight /*Right boarder*/, alienImage){
    this.x = startX //x
    this.y = startY //y
    this.width = 30 //width of the alien
    this.height = 22 //height of the alien
    this.rx = this.x + this.width //right x
    this.by = this.y + this.height //bottom y
    this.speed = 0.25 //speed that alien moves down
    this.image = alienImage //image of the alien
    this.health = 100 //health of the alien
    this.damage = 20 //damage that the alien does to the player
  }

  update() {
    //Update Attributes
    this.y += this.speed //moves alien down by the value of speed
    //Draw Alien
    image(this.image, this.x, this.y, this.width, this.height)
    
    //Draw Healthbar beneath alien
    if (this.health < 100) {
      fill(255, 0, 0)
      rect(this.x + 5, this.y + this.height + 10, this.width - 10, 5, 5) //draws a red rectangle under alien
      fill(255, 255, 255)
      rect(this.x + 5, this. y + this.height + 10, (this.health/100) * (this.width - 10), 5, 5) //draws a white rectangle on top of the red one
    }
    
  }

  getY() {
    return this.y
  }

  getBY() {
    return this.y + this.height
  }

  getX() {
    return this.x
  }

  getRX() {
    return this.x + this.width
  }

  getWidth() {
    return this.width
  }

  getHeight() {
    return this.height
  }

  dealDamage(damage) {
    this.health -= damage
  }

  getHealth() {
    return this.health
  }

  getDamage() {
    return this.damage
  }
}
