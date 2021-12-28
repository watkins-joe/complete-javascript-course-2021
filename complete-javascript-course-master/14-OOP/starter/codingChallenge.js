'use strict';

/////////////////////////
// Coding Challenge #1 //
/////////////////////////

// Your tasks:
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
// 'speed' property. The 'speed' property is the current speed of the car in
// km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10,
// and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log
// the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
// 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h
// GOOD LUCK �

// 1.)

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2.)

Car.prototype.accelerate = function () {
  // log original speed
  console.log(`${this.make} is traveling ${this.speed}`);
  // accelerate speed by 10
  this.speed += 10;
  // log new speed to console
  console.log(
    `${this.make} is accelerating and is now traveling ${this.speed}`
  );
};

// 3.)

Car.prototype.brake = function () {
  // log original speed
  console.log(`${this.make} is traveling ${this.speed}`);
  // decrease speed by 10
  this.speed -= 10;
  // log new speed to console, with car makes
  console.log(`${this.make} is braking and is now traveling ${this.speed}`);
};

// 4.)

// Data car 1: 'BMW' going at 120 km/h
const BMW = new Car('BMW', 120);

BMW.accelerate(); // logs in console speed from 120 to 130

BMW.brake(); // logs in console speed from 130 to 120

// Data car 2: 'Mercedes' going at 95 km/h

const Mercedes = new Car('Mercedes', 95);

Mercedes.accelerate(); // logs in console speed from 95 to 105
Mercedes.brake(); // logs in console speed from 105 to 95

// lines on which console is outputting code from are
// the lines that the method was written on, too. odd?

// added template literal to show this keyword that the method
// was called on

console.log(Mercedes.make); // Mercedes
console.log(BMW.make); // BMW

console.log('---------------------------------------')

/////////////////////////
// Coding Challenge #2 //
/////////////////////////

// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h
// GOOD LUCK �

// 1.)

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    // log original speed
    console.log(`${this.make} is traveling ${this.speed}`);
    // accelerate speed by 10
    this.speed += 10;
    // log new speed to console
    console.log(
      `${this.make} is accelerating and is now traveling ${this.speed}`
    );
  };
  
  brake() {
    // log original speed
    console.log(`${this.make} is traveling ${this.speed}`);
    // decrease speed by 10
    this.speed -= 10;
    // log new speed to console, with car makes
    console.log(`${this.make} is braking and is now traveling ${this.speed}`);
    return this;
  };

  // 2.)
  get speedUS() {
    return this.speed / 1.6;
  }

  // 3.)
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// 4.)

const Ford = new CarCl('Ford', 120);

// accelerate and braking functionality

console.log(Ford.speedUS);
Ford.accelerate();
Ford.accelerate();
Ford.accelerate();
Ford.brake();

Ford.speedUS = 50;
console.log(Ford) // 80 speed, 50 * 1.6.

/////////////////////////
// Coding Challenge #3 //
/////////////////////////

// Your tasks:
// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument
// 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%).Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism �

// Test data:

// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
// GOOD LUCK �

// 1.)

const EV = function(make, speed, charge) {

  // 1.)

  Car.call(this, make, speed)
  this.charge = charge;


}

// Link the prototypes
EV.prototype = Object.create(Car.prototype)

// 2.)

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
}

// 3.)

EV.prototype.accelerate = function() {
  this.speed += 20;
  this.charge--;

  console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`)
} // this accelerate method is used for the EV, as the Car has its own accelerate method too

// when there are two methods/properties in chain, the first one that appears in the chain first is used. a child class can overwrite a method that it inherited from a parent class.

// this is the definition of polymorphism we learned in this section.

// Car.prototype = Object.create(EV.prototype);

const Tesla = new EV('Tesla', 120, 23);

Tesla.chargeBattery(90);

console.log(Tesla)

Tesla.brake();
Tesla.accelerate();

/////////////////////////
// Coding Challenge #4 //
/////////////////////////

// Your tasks:
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
// GOOD LUCK �

// 1.) 

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    // 2.)
    this.#charge = charge
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    // 3.)
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}`
    )
    // 3.)
    return this;
  }
}

const Rivian = new EVCl('Rivian', 120, 23);

Rivian.accelerate().brake().chargeBattery(50).accelerate().accelerate().accelerate().brake().brake().accelerate();







