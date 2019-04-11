
class AdaCat {
  //sets starting parameters of AdaCat
  constructor(name, owner) {
    this.name = name
    this.owner = owner
    this.hunger = 5
    this.isSleeping = false
    this.size = 30
    this.tiredness = 0
    this.message = ""
  }

  setHunger(newHunger) {
    //sets limits of hunger level
    if (newHunger < 0) {
      newHunger = 0
    }
    if (newHunger > 10) {
      newHunger = 10
    }
    this.hunger = newHunger
  }

  setTiredness(newTiredness) {
    if (newTiredness < 0) {
      newTiredness = 0;
    } 
    if (newTiredness > 15) {
      newTiredness = 15;
    }
    this.tiredness = newTiredness;
  }

  setMessage(newMessage) {
    this.message = newMessage
  }

  getDescription() {
    //sets comments seen on index.js when playing the game
    var sleepLine
    if (this.isSleeping) {
      sleepLine = 'Shh! ' + this.name + ' is sleeping.'
    } else {
      sleepLine = this.name + ' is awake.'
    }
    var lines = [
      this.name + ' is a cat. they belong to ' + this.owner + '.',
      'their hunger level is ' + this.hunger + '/10.',

      'they weigh ' + this.size + ' tonnes.',
      'their health is ' + this.getHealth() + '/30.',
      sleepLine,
      'their tiredness level is ' + this.tiredness + '/15',
      this.message
    ]
    return lines.join('\n')
  }

  feed() {
    //function which sets game parameters of feeding
    var hunger = this.hunger - 1
    //when fed hunger level goes down
    var tiredness = this.tiredness + 1
    var message = "Cat is feeding"

    if (hunger < 3) {
      this.size = this.size + 1
    } //if their hunger level goes down, increase the size of AdaCat

    if (this.isSleeping == true) {
      var hunger = this.hunger
      var message = "You are trying to feed a cat while they are napping"
      this.setMessage(message)
    }

    this.setHunger(hunger)
    this.setTiredness(tiredness)
    this.setMessage(message)
  }

  nap() {
    this.isSleeping = true
    this.setTiredness(0);
    this.setMessage("Cat is sleeping")
  }

  wakeUp() {
    this.isSleeping = false
    this.setMessage("Cat is awake now")
  }

  play() {
    var hunger = this.hunger + 3
    //if you play with the cat, their hunger level increases
    var tiredness = this.tiredness + 3
    var message = "Cat is playing"

    if (hunger > 7) {
      this.size = this.size - 1
    } //cat moves further away from ideal weight
    this.setHunger(hunger)
    this.setTiredness(tiredness)
    this.setMessage(message)
  } //updates the hunger of the AdaCat

  getHealth() {
    // the ideal weight for cats is 30
    // this futher they are from this, the less
    // healthy they are
    var sizeDifferenceFromIdeal = Math.abs(this.size - 30)

    // sizeScore starts at thirty, and gets
    // smaller as the cat's size gets further
    // from the ideal weight
    var sizeScore = 30 - sizeDifferenceFromIdeal

    // health score gets lower as the cat gets
    // more hungry
    var healthScore = sizeScore - this.hunger

    // max returns the biggest value, so health
    // will never go below 0
    if (healthScore < 0) {
      healthScore = 0
    }

    return healthScore
  }
}

module.exports = AdaCat
