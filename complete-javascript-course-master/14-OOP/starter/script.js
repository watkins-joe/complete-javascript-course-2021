'use strict';

// LECTURE: Section Intro

// two paradigms -- OOP and functional programming.
// will learn about OOP in this section.

// LECTURE: What is Object-Oriented Programming?

// Object-oriented programming (OOP) is a programming paradigm
// based on the concept of objects.
// paradigm = style of code, "how" we write an organize code

// We use objects to MODEL (describe) real-world or abstract
// features (abstract features being like an HTML component
// or a data structure)

// Objects may contain data (properties) and code (methods).
// By using objects, we pack DATA AND THE CORRESPONDING
// BEHAVIOR into one block.

// In OOP, objects are SELF-CONTAINED pieces/blocks of code.

// Objects are BUILDING BLOCKS of applications, and INTERACT
// with one another.

// Interactions happen through a PUBLIC INTERFACE (API);
// methods that the code OUTSIDE of the object can access
// and use to communicate with the object.

// OOP was developed with the goal of ORGANIZING code, to make
// it MORE FLEXIBLE AND EASIER TO MAINTAIN (avoid "spaghetti
// code")

// Classes and Instances (traditional OOP)

// in OOP, we need a way to generate objects

// class: a bluebrint from which we can create new objects

// example representation, NOT ACTUAL JS SYNTAX, of a class:
// User {
//     user
//     password
//     email

//     login(password) {
//         // login logic
//     }

//     sendMessage(str) {
//         // Sending message logic
//     }
// }

// we call objects created thru a class INSTANCES, which is
// something we can use in our code

// an isntance is a real object we can use on our code that
// was created from a class

// a class itself is NOT an object

// The 4 Fundamental OOP Principles

// 1.) Abstraction

// Ignoring or hiding details that DON'T MATTER, allowing us
// to get an OVERVIEW perspective of the THING we're
// implementing, instead of messing with details that
// don't really matter to our interpretation

// Example is a phone with all of the internal stuff like
// voltage, temperature, vibrate, verify voltage.ect and hide
// these form the user, and only care about the volume,
// charge level, home button, screen, volume buttons, that the
// user interacts with, and abstraction hides all of the rest
// of the internal stuff from the user

// 2.) Encapsulation

// Keeping properties and methods PRIVATE inside the class, so
// they are NOT ACCESSIBLE FROM OUTSIDE THE CLASS. Some methods
// can be EXPOSED as a public interface (API);

// WHY encapsulation?
// Prevents external code from accidentally manipulating
// internal properties/state

// 3.) Inheritance

// Making all properties and methods of a certain class
// AVAILABLE TO A CHILD CLASS, forming an hierarchical
// relationship between classes. This allows us to REUSE
// common logic and to model real-world relationships.

// CHILD CLASS EXTENDS PARENT CLASS

// as an example, the User parent class makes an instance
// called Admin, which is the child class. The Admin has
// additional methods and properties as well as the original
// User's ones, too.

// 4.) Polymorphism

// A child class can OVERWRITE a method it inherited from
// a parent class [it's more complex that that, but enough
// for our purposes]

// as an example, an Author is created as an instance of
// the User class, and Authors have different login methods
// and a method called writePost() which allows whem to
// write posts

// LECTURE: OOP in JavaScript

// Prototype
// Contains methods

// Object
// Can access methods of the prototype

// Objects are LINKED to a prototype object

// PROTOTYPAL INHERITANCE: The prototype contains methods
// (behavior) that are ACCESSIBLE TO ALL OBJECTS LINKED TO
// THAT PROTOTYPE

// Behavior is DELEGATED to the linked prototype object
// Technically, objects delegate their behavior to the
// prototype

// Objects inherit methods and properties from Prototypes
// In JS, it's like an instance inheriting from a class

// Array.prototype is the prototype of all array objects we
// create in JavaScript. Therefore, all arrays have access
// to the those array methods!

// 3 WAYS OF IMPLEMENTING PROTOTYPAL INHERITANCE IN JAVASCRIPT

// 1.) Constructor functions

// Technique to create objects from a function
// This is how built-in objects like Arrays, Maps, or Sets
// are actually implemented.

// 2.) ES6 Classes

// Modern alternative to constructor function syntax;
// "Syntactic sugar", behind the scenes, ES6 classes work
// EXACTLY like constructor functions;
// ES6 classes do NOT behave like classes in "classical OOP"
// from last lecture;

// 3.) Object.create();

// The easiest and most striaghtforward way of linking an
// object to a prototype object

// LECTURE: Constructor Functions and the new Operator

// we can use a constructor function to build an bject
//using a function

// a constructor function is actually a completely
// normal function.

// the only difference between a regular function and a
// constructor function is that we call a constructor
// function with the 'new' operator

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never create a method inside of a constructor
  // function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
  // will use protoypal inheritance later
};

const jonas = new Person('Jonas', 1991);
console.log(jonas); // logs Person object

// the new operator calls the person function, but does a lot
// more than that.

// behind the scenes, there are four steps that happens
// 1.) a new empty object is created {}
// 2.) the function is called, the 'this' keyword is set to
// this new empty object
// 3.) newly created object is linked to a prototype
// 4.) function automatically returns the object from the
// beginning
// in OOP, there is a convention that constructor functions
// always start with a capital letter. always follow that
// convention

// an arrow function will not work as a function constructor
// because it doesn't have its own keywords -- only works w/
// function declarations and function expressions

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// an object created from a class is called an instance, but
// we didnt technically create a class as JS doesn't have
// classes in the sense of traditional OOP, however, we did
// create 3 objects from a constructor function. constructor
// functions have been used since the beginning of JS to
// simulate classes.

// therefore, 'Jonas' is an instance of Person.

// check if object is an instance of something
console.log(jonas instanceof Person); // true

// creating static method on the person constructor,
// from static methods lecture
Person.hey = function () {
  console.log('Hey there *waving*');
  console.log(this); // logs entire constructor function
  // whatever object is calling the method will be
  // the this keyword inside of this function.
};

Person.hey();

// cannot call the hey() on jonas, is not on the prototype of
// the jonas object
// LECTURE: Prototypes

// using same code from above

// 1.) each and every function in JavaScript automatically
// has a property called prototype. this includes constructor
// functions

// 2.) every object that created by a certain constructor
// function will get access to all the methods and properties
// that we defined on the constructors prototype property

// example for visualization
Person.prototype;
// the prototype property of the Person constructor function

console.log(Person.prototype);

// using protoypal inheritance
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// all objects created using the Person constructor
// function can use the calcAge method

jonas.calcAge(); // 46
matilda.calcAge(); // 20

// why does this work?

// any object always has access to the methods and properties
// from its prototype, and the prototype of jonas and matilda
// is Person.prototype

// can confirm this
console.log(jonas.__proto__); // {calcAge: f, constructor: f}
console.log(jonas.__proto__ === Person.prototype); // true

// Person.prototype is not the prototype of person, but it
// is what is going to be used as the prototype of all of
// the objects that are created with the Person constructor
// function

console.log(Person.prototype.isPrototypeOf(jonas)); // true
// Person.prototype is the prototype of jonas

console.log(Person.prototype.isPrototypeOf(Person)); // false
// Person.prototype is NOT the prototype of Person

// where does the __proto__ property come from?

// comse from step #3 that creates the __proto__ property
// sets proto property to the prototype property of the
// constructor function that is being called

// can set properties on prototype, not just methods

Person.prototype.species = 'Homo Sapiens';

console.log(jonas.species, matilda.species);
// Homo Sapiens Homo Sapiens

// the species property is not directly here, but there are
// inside the objects prototype, so we are able to use
// jonas.species and the object will then inherit so they
// will get access to this property from the prototype

// however, when we look at the objects, the property
// is not really directly in the object, so it is not its own
// property.

// OWN properties are only the ones that are declared DIRECTLY
// on the object itself, so NOT including the INHERITED
// properties

// we can check for that
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// LECTURE: Prototypal Inheritance and the Protoype Chain

// How Prototyal Inheritance / Delegation Works

// Constructor function
// [Person()]

// points to the prototype with .prototype

// Prototype (not Prototype of Person, but objects
// created by Person)
// [Person.prototype]

// points back to the constructor function with .constructor

// The new operator
// 1.) An empty object is created
// 2.) this keyword is constructor function call is set to
// the new object
// 3.) The new object is linked to (__proto__ property) to
// the constructor function's prototype property
// 4.) The new object is returns from the constructor
// function call

// The object, [jonas], then points to the Prototype with
// its prototype property .__proto__, which always points to
// an object's prototype

// This is how it works with FUNCTION CONSTRUCTORS and ES6
// classes

// Why does this work this way, why is this so unique and
// and powerful?

// because the jonas object does not have its own calcAge
// method, JS looks in the objects prototype and delegates
// the calcAge functionality to its prototype

// we can create as many person objects as we like and they
// will inherit that calcAge method, this is essential for
// code performance

// Prototype Chain
// the ability of looking up methods and properties in a
// prototype, but doesn't end here

// remember that Person.prototype is an object itself, and that
// every object in JS has a prototype. it has a prototype
// called Object.prototype, which is created using the
// Object() constructor function, which is a built-in constructor
// function for objects. This is used when we write an object
// literal: {...} === new Object(...)

// The prototype is very similar to the scope chain, which is
// a series of links between objects, linked thru prototypes

// JS keeps looking up into the next prototype in the prototype
// chain

// LECTURE: Prototypal Inheritance on Built-in Objects

console.log(jonas.__proto__);
// logs Person prototype
console.log(jonas.__proto__.__proto__);
// Prototype property of Object
console.log(jonas.__proto__.__proto__.__proto__); // null
// Object.prototype is usually top of scope chain

console.dir(Person.prototype.constructor);

// Prototype of a function
const arr = [1, 2, 3, 4, 5, 6, 7, 7, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__);
// Object. prototype

// We know at this point any array inherits methods from its
// prototype

// added a new method to the prototype property of the Array
// constructor, so all new Arrays will inherit the new method
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// however, this is typically not a good idea.
// 1.) the next version of JS that may add a method with the
// same name, but may work in a different way and may
// break your code
// 2.) when working on a team, if multiple devs add the same
// functionality with different names, that would be hard
// to debug

const h1 = document.querySelector('h1');

console.dir(h1); // shows prototype chain of h1 element, which
// goes very very deep

console.dir(x => x + 1); // function prototype, as they are
// objects

// LECTURE: ES6 Classes

// classes in JS do not work like classes in Java or C++,
// are syntactical sugar.

// // class expression
// const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // adding methods
  // important: all methods in the class, outside of the
  // constructor, will be on the prototype of the objects,
  // and not on the objects themselves.

  // Instance methods
  // methods that will be added to the prototype peroperty
  // so that all instances can have access to them
  // methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  // added from getters and setters lecture
  get age() {
    return 2037 - this.birthYear;
  }

  // using setters for data validation
  // adding _ to fullName property avoids an error

  // set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there static');
    console.log(this);
  }

  // these static methods are not available on instances
  // and sometimes they are still usedful to implement
  // some kind of helper function about a class or about
  // a constructor function
}

// behind the scenes classes are functions.

const jessica = new PersonCl('Jessica Davis', 1996);

console.log(jessica);
jessica.calcAge(); // 41

console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.prototype.greet = function () {
//   console.log(`Hey, ${this.firstName}`);
// };

jessica.greet();

// things to keep in-mind!
// 1.) Classes are NOT hoisted
// this means that we cannot use them before they are declared
// in the code,
// function declarations are hoisted, which means we can use
// them before they are declared in the code.
// 2.) Classes are first-class citizens
// this means that we can pass them into functions and also
// return them from functions, since they are a special
// kind of functions behind the scenes
// 3.) Classes are executed in strict mode
// the body of a class is always executed in strict mode,
// even if we didn't activate it in our whole script

// should we use constructor functions or classes?
// 1.) constructor functions are not old or deprecated
// syntax, so it is a matter of personal preference.

// LECTURE: Setters and Getters

// feature common to all objects in JS
// these are called assessor properties.

// functions that get and set a value, but they still look like
// regular properties.

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  // any setter method needs to have exactly one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
  // not mandatory to set a setter and a getter together for same
  // property
};

// we write it as if it were a property, don't call it.
console.log(account.latest); // 300

account.latest = 50;
console.log(account.movements); // adds 50 to end of movements
// array

console.log(jessica.age); // 41

// added above to PersonCl class from getters and setters lecture
// get age() {
//   return 2037 - this.birthYear;
// }

// setters and getters can also be used for data validation

// LECTURE: Static Methods

// built in Array.from method is an example, this converts
// any array-like structure to a real array.

// the from method is attached to the Array constructor, and
// not to the prototype.

// the reason is so that developers know that it's related to
// arrays, the from() method is from the Array namespace.

// from() is static on the Array constructor

// static methods are not available on the instances but sometimes they
// are still useful to implment some kind of helper function about
// a class or about a constructor function

// LECTURE: Object.create

// third way of implementing prototypal inheritance

// with object.create, there is:
// still the idea of prototypal inheritance
// BUT -- there are no prototype properties involved
// ALSO no constructor function and NO new operator

// instead we can use object.create to manually set the prototype
// of any to any other object that we want

// simply an object literal
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear)
  },

  // new method
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}

// now, create a person object with this object as the prototype

// will return a brand new object that will be linked to the
// PersonProto object
const steven = Object.create(PersonProto);

console.log(steven)

// for now, the object is empty, but we have the prototype in there and we have calcAge();, but has no properties

steven.name = 'Steven';
steven.birthYear = 2002;
// not ideal of making new object instead of hard coding them, but we are just worried about protos and proto chains

steven.calcAge(); // 35

// HOW OBJECT.CREATE WORKS

// Constructor Functions

// when we use the new operator in constuctor functions or classes, it automatically sets the prototype of the instances to the constructor's prototype property

// Object.Create()

// we can set the proto of objects manually to any object that we want

// the big difference is that we didn't need any constructor function or any prototype property to do the exact same thing.

// in practice, object.create is the least used way of implementing prototypal inheritance.

// we will need object.create to link prototypes in the next lecture in order to inheritance between classes

// verify this in code

console.log(steven.__proto__)
console.log(steven.__proto__ === PersonProto) // true

const sarah = Object.create(PersonProto);

sarah.init('Sarah', 1979);
sarah.calcAge();

console.log(sarah)

// Takeaway:
// Object.create() creates a new object and the prototype of that new object is the object that we passed in.

// LECTURE: Inheritance Between "Classes": Constructor Functions

const PersonSecond = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

PersonSecond.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  // use Person's instead:

  Person.call(this, firstName, birthYear);
  this.course = course;

  // We need to manually set the this keyword. Using the call method, we can specify the 'this' keyword as the first argument in the function. we want the 'this' keyword in the Person function to be the 'this' keyword in the Student function. 
}

// LINKING PROTOTYPES

// We are going to have to create a connection between prototype objects together, we have to use Object.create.

Student.prototype = Object.create(Person.prototype)
// Now, the student.prototype object is now an object that inherits from Person.prototype

// We have to create this connection here before we add any more methods to the prototype opbject of student, because object.create will return an empty object.

// Adding the Object.create() after we add methods to the student.prototype will overwrite the methods already on there. which is why we have to have this code before we add methods, like the one below, to the student prototype.

// why couldn't we do this?
// Student.prototype = Person.prototype

// this doesn't work at all -- if we do that, then we not end up with a prototype chain that we need. we will end up with saying the student's prototype property and the person's prototype proerty should be the same exact object. we want to INHERIT from it, but it not become the same object.

Student.prototype.introduce = function() {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`)
}

const Mike = new Student('Mike', 2020, 'Computer Science');
console.log(Mike);

Mike.introduce();

// We are going to have to create a connection between prototype objects together, we have to use Object.create.

Mike.calcAge();
// by doing this method, we are doing a method lookup thru the prototypes. it's not directly on the mike object nor his prototype. but, using lookup, it is found on the person prototype, because it looks up even further in the prototype chain.

// inspect all in the console
console.log(Mike.__proto__)
console.log(Mike.__proto__.__proto__)

console.log(Mike instanceof Student) // true
console.log(Mike instanceof Person) // true
// because prototypes are linked together.

Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor);

// LECTURE: Inheritance Between "Classes": ES6 Classes

class PersonCl2 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // adding methods
  // important: all methods in the class, outside of the
  // constructor, will be on the prototype of the objects,
  // and not on the objects themselves.

  // Instance methods
  // methods that will be added to the prototype peroperty
  // so that all instances can have access to them
  // methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  // added from getters and setters lecture
  get age() {
    return 2037 - this.birthYear;
  }

  // using setters for data validation
  // adding _ to fullName property avoids an error

  // set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there static');
    console.log(this);
  }

  // these static methods are not available on instances
  // and sometimes they are still usedful to implement
  // some kind of helper function about a class or about
  // a constructor function
}

// IMPLEMENTING INHERITANCE BETWEEN ES6 CLASSES

// we need two things:

// 1.) extends keyword
// 2.) super function

class StudentCl2 extends PersonCl2 {
  constructor(fullName, birthYear, course){
    // we don't have to call PersonCl.call(...)

    // instead, we call the super function and we pass in the arguments of the constructor of the PARENT class
    
    // this ALWAYS needs to HAPPEN FIRST
    // this call is responsible for creating the  "this" keyword in this sub-class
    super(fullName, birthYear);
    this.course = course
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`)
  }

  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`)
  }
}

// IF you do NOT need ANY NEW PROPERTIES, you don't need to both writing a constructor method in a child class.

const martha = new StudentCl2('Martha Jones', 2012, 'Computer Science')

martha.introduce();
martha.calcAge();

// the mechanism of inheritance can be very problematic and dangerous in the real world. keep this in mind, but this will be mentioned in functional programming, the opposite of OOP.

// LECTURE: Inheritance Between "Classes": Object.create

const PersonProto2 = {
  calcAge() {
    console.log(2037 - this.birthYear)
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven2 = Object.create(PersonProto2);

// adding another prototype in the middle of the chain

// make student inherit directly from person, already established parent-child relationship we were looking for

const StudentProto = Object.create(PersonProto2);

StudentProto.init = function(firstName, birthYear, course) {
  // use same trick we used before w/ constructor functions

  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
}

// now we can use this studentproto to create new students

StudentProto.introduce = function() {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`)
}

const jay = Object.create(StudentProto);

jay.init('Jay', 2010, 'Computer Science')
jay.introduce();
jay.calcAge();

// in this version, we don't even worry about constructor functions, new operator, or properties anymore. some thing this is better than "faking" classes in JS. all we are doing is simply linking objects together.

// LECTURE: Another Class Example

// 1.) Public fields
// 2.) Private fields
// 3.) Public methods
// 4.) Private methods

// *** there is also the static version of the same four. ***

// Remember? --> we've used the static public method before, by adding the 'static' keyword before it. we use this for helper functions. because these static methods will NOT be available on all of the instances, but ONLY on the class itself.

class Account {

  // 1.) Public fields
  locale = navigator.language;
  
  // 2.) Private fields (available on instances themselves, not the prototype)
  #movements = []
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;

    // CAN create properties that are NOT based on any inputs
    // "protected" property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}!`)
  }

  // 3.) Public methods

  // Public interface
  getMovements(){
    return this.#movements
  }


  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    // can call other methods in other methods.
    this.deposit(-val)
    return this;
  }

  requestLoan(val) {
    // if(this.#approveLoan(val)) {
    if(this._approveLoan(val)) {
      // approveLoan is an internal method that another method uses, another very important point in data privacy and data encapsulation. it's a method that shouldn't be able to be accessed by anything else but this method for approving a loan, say, based on a condition.
      this.deposit(val);
      console.log(`Loan approved!`)
      return this
    }
  }

  static helper() {
    console.log('Helper')
  }

  // 4.) Private methods

  // #approveLoan(val) {
  _approveLoan(val) {
    return true
  }
}

const acct1 =  new Account('Jonas', 'EUR', 1111);

console.log(acct1)

// acct1.movements.push(250);
// acct1.movements.push(-140);
// interacting directly with properties like this is not a good practice.

// is it better to create methods that will directly interact with properties, than doing it this way.

// doing it this way is much better to do. the minus in the withdrawl method was abstraced away, and the user doesn't have to worry about that.
acct1.deposit(250);
acct1.withdraw(140);
acct1.requestLoan(1000);

// there is nothing stopping someone on our team from interacting with the movements array directly. it doesnt make it impossible.

console.log(acct1.pin) // stuff like this shouldn't be accessible either, as a pin is very secret information.

// talking more about security and data privacy in the next lecture.

// LECTURE: Encapsulation: Protected Properties and Methods

// encapsulation -- keeping some methods and properties private inside the class so that they are not accessible from outside of the class

// this is essential to do in anything more than a toy application

// data encapsulation and privacy important reasons

// 1.) prevents code from outside of a class accidentally manipulating data inside the class

// 2.) when we expose only a small interface, a small API of a few public methods, then we can change all of the other internal methods with more confidence. with this, we can ensure that external code does not rely on these private methods. therefore, our code will not break when we do other changes.

// there is a proposal to add "true" data privacy and encapsulation. we will "fake" it using a convention until release

// the first candidate to protect is the movements array of the account class, specifically this.movements. all we do is simply add an underscore _ to the name at the beginning, like so

// this.movements -> this._movements, but this does NOT make the data truly private. because of this, we call this a protected property

// you can still refer to _movements outside of the class like you could with movements, but this underscore tells other devs and team that you shouldn't be able to interact with that outside of the class and will know that is it wrong to access the property outside of the class

console.log(acct1.getMovements());
console.log(acct1);

// another one is the PIN that we don't want access to, as well as the approveLoan method, a method that is also supposed to be used internally by the bank. this method should not be part of the public API.

// console.log(acct1.#pin);
// Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class

// again, throws an error because unaccessible outside of the class.

// talking about truly private methods and stuff next

// LECTURE: Encapsulation: Private Class Fields and Methods

// they are part of a bigger proposal to changing JS classes, class fields. 

// there are 4 different kinds of fields and methods in the class fields proposal

// 1.) Public fields
// think of a field as a property that will be on all instances, is why we can also call it a public instance field.

// in our example, the two fields can be the movements and the locale, as they are the two properties that will be on all objects that we create with the Account class, as we don't pass any of these values into the constructor, and they will be set for all instances.

// doing so we add the following to the account class:

// class Account {
  // locale = navigator.language;
  // we write the public field kinda like a variable, BUT we have to add a semi colon at the end of it. keep in mind that we don't add a semi colon at the end of any methods in the class, after the last curly bracket.
  // we also don't have to declare it using const or let.

  // *** these public fields will be present on ALL instances we are creating through the class and ARE NOT on the PROTOTYPE ***

  // all of the methods we add later on in the class will always be added to the prototype, BUT again, the public fields are on the INSTANCES

  // public fields are also referenceable by the 'this' keyword.

  // this is how we define a public field
// }

// 2.) Private fields
// can now make it so that properties are truly not accessible from the outside.

// we make properties into private fields by appending a # mark to the beginning of the property name. (ie movements -> #movements) this requires an update to #movements whereever 'movements' is written, or it will return an undefined typeerror.

// console.log(acct1.#movements);
// Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class

// js thinks that we are trying to implement this private class field out here in the global scope.

// what matters is that we cannot access this property outside of the class, given that error and the attempt to access it. and that the 'movement' property from before doesn't exist.

// as of lecture 221, apparently only google chrome supports the private class fields -- check on that as of right now 8/27/21.

// as of 8.27.21, private fields are supported in all browsers except internet explorer

// the movements are now truly private, and not accessible outside the class, except with the method getMovements() of course.

// the next candidate to make private is the PIN. convert it to a truly private field. we cannot define a field in the constructor. we have to create the private field out there with hash, but don't set it to anything. it's just like creating an empty variable.

// like so:

// class Account {
//    ...
//    #movements = [];
//    #pin;
//    // create the private field #pin, but empty. just like 'let pin';
// }

// 3.) Public methods
// the methods in the public interface are public methods.

// 4.) Private methods
// very useful to hide the implementation details from the outside

// to make a private method, its the same syntax as a private field -- using the # that comes before the function name. ie approveLoan -> #approveLoan

// chrome put the approveLoan method in the instance as if it were a private field, appearing as #approveLoan, next to #movements and #pin.

// console.log(acct1.#approveLoan(100)) // error, does not work.

// chrome sees this as a private class field, or a private field, and lists it as so.

// for the time being, we will then go back to using the underscore to mark the method as protected instead of truly "protecting it" with the hashtag '#'. this change has been reflected and the one with the hashtag has been commented out for reference purposes.

// staic functions can only be used/called on the class itself, and not instances of the classes, such as the acct1 instance.
Account.helper();

// LECTURE: Chaining Methods

// we can implement method chaining in the methods of our class.
// this is very easy to do -->

// we just have to return the object itself at the end of the method that we want to be chainable

// Chaining

// acct1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000)

// just the above code is not enough to work -- the first method call on acct1 will work (acct1.deposit(300)), but the second call (.deposit(500)) will not work because deposit returns undefined, and gives an error of 'Uncaught TypeError: Cannot read property 'deposit' of undefined'. this is because deposit does not return anything, and does not have a return statement specifying to return anything else but undefined. we are trying to call the deposit method on 'undefined'

// we have to return the object itself in order for the chaining to work.

// we have to modify the deposit method and all other methods to return this, because this is the current object.

acct1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000)

console.log(acct1.getMovements())

// LECTURE: ES6 Classes Summary

// things to remember about classes:

// 1.) Classes are just "syntactic sugar" over constructor functions
// 2.) Classes are NOT hoisted
// 3.) Classes are FIRST-CLASS citizens
// 4.) Class body is ALWAYS executed in STRICT MODE


