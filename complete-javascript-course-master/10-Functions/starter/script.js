'use strict';

// // LECTURE: Default Parameters

// // sometimes it useful where some parameters are set by
// // default. this way, we do not have to pass them in manually

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // old way (pre-ES6) of setting default parameters
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;

//   // new way (ES6 -> onward)
//   // new way is setting the parameter equal to the value that
//   // you want it's default to be in the function area

//   // default values can contain ANY expression, we can also
//   // use the values of the other parameters that were set
//   // before it

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// // calling function without default parameters set
// createBooking('LH123');

// // logs object with flightNum = LH123, and other params
// // == to "undefined"

// // we can now use short-circuting to our advantage because
// // undefined is a falsy value

// createBooking('LH123', 2, 800);
// createBooking('LH123', 2, 800);

// // we cannot skip parameters -- for example
// createBooking('LH123', 1000);

// // and the 1000 we wanted to be the price, that would not work
// // the second argument is numPassengers and this function call
// // is as if there are 1000 passengers

// // SKIPPING DEFAULT PARAMETER

// // however, we can bypass this with a nice trick:

// // by setting the value of the variable we don't want to set
// // to 'undefined' in the function call

// createBooking('LH123', undefined, 1000);
// // logs 1 passenger, because it defaults to 1 and 1000 price
// // as setting the parameter to 'undefined' is the same thing
// // as not even setting it

// // LECTURE: How Passing Arguments Works: Value VS Reference

// const flight = 'LH234';

// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 2473191827,
// };

// const checkIn = function (flightNum, passenger) {
//   // should not change params of function
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 2473191827) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport');
//   }
// };

// // checkIn(flight, jonas);
// // console.log(flight);
// // console.log(jonas);

// // what happened after this function?

// // flight string did not change, even though we told it to
// // in function
// // the jonas.name property is now "Mr. Jonas Schmedtmann" instead
// // of 'Jonas Schmedtmann'

// // flight is a primitive type, just a string. as we passed
// // that value into the function, the flightNum is a copy
// // of the original value, not simply THE original value.
// // the change in the function did not get reflected in the
// // outside variable

// // the jonas object in the function is passed in as passenger
// // we changed the passenger object, and then the jonas object
// // was changed. when we pass a REFERENCE type to a function,
// // what is copied is the reference to the object in the memory
// // heap. the passenger object and the jonas object are the
// // same object in the memory heap, which is why they are both
// // changed

// // summary
// // passing a PRIMITIVE type to a function is the same as
// // creating a copy outside of the function, example:
// // const flightNum = flight

// // when we pass an object to a function, it is really just like
// // copying an object like this. whenever we change in the copy
// // we change in the origina
// // const passenger = jonas;

// // we need to be careful with this behavior -- can have
// // unforseeable consequences

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(jonas);

// checkIn(flight, jonas); // this makes alert say 'wrong passport'
// // as the passport for jonas gets updated to a random number

// // two terms used for dealing with functions

// // 1.) passing by value

// // 2.) passing-by reference
// // JS does not have passing-by reference, even though it looks
// // like its passing by reference. the reference that was passed
// // for the object earlier is still a value. it's simply
// // a value that contains a memory address, so basically
// // we pass a reference to the function we do not pass-by a
// // reference

// // LECTURE: First-Class and Higher-Order Functions

// // First-Class Functions:

// // JavaScript treats functions as first-class citizens
// // This means that functions are simply values
// // Functions are just another "type" of object, as objects
// // are values too, just like functions

// // Higher-Order Functions:

// // A function receives another function as an argument, that
// // returns a new function, or BOTH

// // This is only possible because of first-class functions

// // an example of a higher order functions is as follows:
// const greet = () => console.log('Hey Jonas');
// btnClose.addEventListener('click', greet);
// // where addEventListener is the higher order function,
// // as it receives another function as an input. greet
// // in this example is the callback function

// // function that returns a new function
// function count() {
//   // function count() is the higher-order
//   let counter = 0;
//   return function () {
//     // this one is the returned function
//     counter++;
//   };
// }

// // summary

// // first-class functions is just a feature that a language
// // either has or does not have
// // simply means that all functions are values. there are no
// // 'first class' functions in practice

// // there are higher-order functions in practice because a
// // language supports/has first-class functions

// // LECTURE: Functions Accepting Callback Functions

// const oneWord = function (str) {
//   return str.replaceAll(' ').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // higher-order function
// // operates at a higher abstraction level than other functions
// // leaves the lower level details to 'low level' functions
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by ${fn.name}`); //
// };

// // calling higher-order function,
// // passing in only the function value, not calling the
// // actual function.
// // the transformer function will call the upperFirstWord
// // function for us
// transformer('JavaScript is the best', upperFirstWord);

// transformer('JavaScript is the best', oneWord);

// // JS uses callback all of the time

// // callback functions allow us to create abstractions
// // absctration -> hide the detail of some code implementation
// // b/c we dont care about the detail, allows us to think about
// // problems at a higher, more abstract level
// // transformer function doesn't care what the string is,
// // it just does it. we abstracted the transforming code
// // to separate lower level functions
// const highFive = function () {
//   console.log('waving');
// };

// document.body.addEventListener('click', highFive);

// ['Jonas', 'Martha', 'Adam'].forEach(highFive);

// LECTURE: Functions Returning Functions

// const greetNormal = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greetNormal('Hey');

// greeterHey('Jonas'); // Hey Jonas
// greeterHey('Steven'); // Hey Steven

// // this works because of something called a closure

// greetNormal('Hello')('Jonas'); // Hello Jonas

// // challenge: rewrite the greet function as an arrow function

// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// greetArr('Hello')('Meme');

// greetArrow('Hello')('Joe');

// // Lecture: The Call and Apply Methods

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // enchanced object literal syntax
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
//     );
//     this.bookings.push({
//       flight: `${this.iataCode}${flightNum}`,
//       name: `${name}`,
//     });
//   },
// };

// // lufthansa.book(239, 'Jonas Schmedtmann');
// // lufthansa.book(635, 'Mike Smith');

// // console.log(lufthansa.bookings);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
//   // copying and pasting method from lufthansa is bad practice
//   // instead, we created a function outside the object to
//   // reference in the eurowings object
// };

// const book = lufthansa.book;

// // // book(23, 'Sarah Williams');
// // // returns undefined typeerror
// // // as normal functions point 'this' to undefined.

// // // we need to tell JS explicitly which object "this" should
// // // point to/look like. there are 3 methods to do this

// // // call, apply, and bind.

// // // in call, the first argument is exactly what we want the
// // // this keyword to point to, followed by other method
// // // arguments.

// book.call(eurowings, 23, 'Sarah Williams');
// // console.log(eurowings);

// // book.call(lufthansa, 239, 'Mary Cooper');
// // console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// // book.call(swiss, 583, 'Mary Cooper');
// // console.log(swiss);

// // // all of the properties of the airlines objects need to
// // // have the same names

// // // apply method -- apply does not receive a list of arguments
// // // instead takes an array of the arguments. will takes elements
// // // from the array and pass them into the function

// // const flightData = [583, 'George Cooper'];
// // book.apply(swiss, flightData);
// // console.log(swiss);

// // // apply is not used as much anymore in modern JS.

// // book.call(swiss, ...flightData);
// // // can use call method with spread operator on the array
// // // we created above to extract the elements as arguments
// // console.log(swiss);

// // LECTURE: The Bind Method

// // the final method is the bind method, bind also allows
// // us to manually set the this keyword for any function call
// // the difference is that bind does NOT immediately call the
// // function, instead returns a new function where the this
// // keyword is bound.

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// bookEW(23, 'Steven Williams');
// console.log(eurowings);

// const bookEW23 = book.bind(eurowings, 23);

// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');

// // books flight for only EW flight 23, as 23 was set in
// // bookEW23 function from line 353.

// // partial application = setting parameters as already
// // predefined

// // With event listeners

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// // this keywords always points to the element on which the
// // event handler is attached to.

// // use bind to fix this. see above now.

// // partial application = preset parameters

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // dont care about this keyword in this function bc its not
// // in addTax, in place of it we write null

// // addVat = value => value + value * .23

// console.log(addVAT(100));

// // challenge -- rewrite the add tax value with one function
// // returning another function.

// // const greetNormal = function (greeting) {
// //   return function (name) {
// //     console.log(`${greeting} ${name}`);
// //   };
// // };

// const addTaxChallenge = function (rate) {
//   return function (value) {
//     // let total = value + value * rate;
//     // console.log(total);
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTaxChallenge(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// // LECTURE: Immediately Invoked Function Expressions

// // a function that disappears after its called once

// const runOnce = function () {
//   console.log('This will never run again.');
// };

// runOnce();
// // this can be called infinite number of times, as it is
// // stored to a variable

// // execute a function immediately without having to save
// // it anywhere

// // immediately invoked function expression

// (function () {
//   console.log('This will never run again');
//   const isPrivate = 23;
//   // in encapsulated in the function scope
// })();
// // trick JS into thinking it's an expression, add the () after
// // parenthesis to call it once. it is not stored to variable

// (() => console.log('This will never run again'))();

// // can also do with arrow functions

// {
//   const isPrivate = 23;
//   var notPrivate = 46;
// }

// // console.log(isPrivate); // error
// console.log(notPrivate); // works

// // LECTURES: Closures

// const secureBooking = function () {
//   // a closure is not a feature that we explicity use,
//   // it happens automatically in certain situations
//   let passengerCount = 0;
//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();

// booker();
// booker();
// booker();

// // the booker function is a function that exists in the
// // global scope, the booker fucntion somehow continues to
// // have access to the variables that were present at the time
// // the function was created (in this case the passengerCount
// // variable). a closure makes a function remember all the
// // variables that existed at the functions birthplace.
// // secureBooking is the birthplace of the booker function.

// // the secret of the closure: any function always has access
// // to the variable environment of the executing context
// // in which the function was created, even after that
// // execution context is gone

// // thanks to a closure, a function does not lose connection
// // to variables that existed at the functions birthplace.

// // Understanding closures

// // A function has access to the variable environment (VE) of
// // the execution contect in which is was created.
// // Closure: VE attached to the function, exactly as it was
// // at the time and place the function was created.

// // definitions of closures:
// // Formal
// // A closure is the closed-over variable environment of the
// // execution context in which a function was created, even after
// // that execution context is gone

// // Less formal
// // A closure gives a function access to all of the variables of
// // its parent function, even after that parent function has
// // returns. The function keeps a reference to its outer scope,
// // which perserves the scope chain throughout time.

// // Even less formal
// // A closure makes sure that a function doesn't lose connection
// // to variables that existed at the function's birthplace.

// // Even less, less formal
// // A closure is like a backpack that a function carries around
// // wherever it goes. This backpack has all the variables that
// // were present in the environment where the function was
// // created.

// // REMEMBER:
// // we do NOT have to manually create closures, this is a JS
// // feature that happens automatically. We can't event access
// // closed-over variables explicitly. A closure is NOT a
// // tangible JS object.

// console.dir(booker);

// // shows us function in console, and shows us the scope of the
// // closure in console. [[]] means internal property we cannot
// // access from code

// // LECTURE: More Closure Examples

// // Example 1
// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();

// // the a variable is inside the backpack of the f function
// f(); // 46
// console.dir(f); // in its closure, a has value of 23

// // reassigning f function
// h();
// f(); // 1554

// console.dir(f); // in its closure, b has value of 777 now

// // closure can change when variable is reassigned. does not
// // lose connection to variables that were present at its
// // birthplace

// // Example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;

//   // timer
//   // first argument is function to be executed after x
//   // time has passed, second is time until function is
//   // executed, in miliseconds (1000 milliseconds = 1 sec)
//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);

//   // clear sign of a closure working, as the setTimeout
//   // function operated by itself, independent from boardPassengers();
//   // function

//   console.log(`Will start boarding in ${wait} seconds`);
// };

// const perGroup = 1000;
// // if it wasn't for the closure, boardPassengers would use
// // the above perGroup variable.

// // this proves that the closure has priority over the
// // scope chain.
// boardPassengers(180, 3);
