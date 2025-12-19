class bullet {

  constructor(image, centerX, y, speed) {
    this.image = image //Image that will be displayed to the user
    this.centerX = centerX //center X coordinate of the bullet
    this.width = 10
    this.height = 23
    this.x = this.centerX - this.width / 2 //X coordinate of the bullet 
    this.y = y
    this.speed = speed //Speed the bullet will travel
    this.hit = false
    this.damage = 50 //Damage the bullet will do to alien
  }


  update() {
    this.y -= this.speed //Moves the bullet upwards
    
    image(this.image, this.x, this.y, this.width, this.height) //Draws the bullet image
  }

  getHit() {
    return this.hit
  }

  setHit(hit) {
    this.hit = hit
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

  getDamage() {
    return this.damage
    //return 20
  }

  setDamage(dmg) {
    this.damage = dmg
  }
  
}