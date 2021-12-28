'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millennial = true;
//       // creating New variable with same name as outer scope's variable
//       const firstName = 'Steven';

//       // Reassigning outer scope's variable
//       output = 'NEW OUTPUT';

//       const str = `Oh, and you're a millennial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // console.log(str);
//     console.log(millennial); // millennial is function scoped
//     // add(2, 3); // ReferenceError w/ strict mode on, else no error
//     console.log(output); // NEW OUTPUT
//   }
//   printAge();

//   return age;
// }

// const firstName = 'Joe';

// calcAge(1991);

// // console.log(age);
// // printAge();

// const myName = 'Jonas';

// if (myName === 'Jonas') {
//   console.log(`Jonas is a${job}`);
//   const age = 2037 - 1989;
//   console.log(age);
//   const job = 'teacher';
//   console.log(x);
// }

// LECTURE: Hoisting and TDZ in Practice

// variables
// console.log(me); // hoisted to undefined
// console.log(job); // RefError, cannot access before init
// console.log(year); // does not output, would have same error as job

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

// // functions
// console.log(addDecl(2, 3)); // 5
// console.log(addExpr(2, 10)); // RefError, cannot access before init
// console.log(addArrow(2, 50)); // does not output, would have same error as addExpr
// function addDecl(a, b) {
//   return a + b;
// }

// var addExpr = function (a, b) {
//   // becomes undefined
//   return a + b;
// };

// const addArrow = (a, b) => a + b; // also in TDZ b/c defined w/ const

// Example of pitfall of hoisting

// console.log(numProducts);
// //undefined b/c of hoisting

// if (!numProducts) deleteShoppingCart();
// //function executes anyway, even though numProducts = 10,
// //and bc undefined == falsey value, the code will still exec.

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// // variables declared with let or const do not create
// // properties on the window object

// console.log(x === window.x); //true
// console.log(y === window.y); //false
// console.log(z === window.z); //false

//LECTURE: The this keyword

// Method --> this = <object that is calling the method>

// const jonas = {
//   name: 'Jonas',
//   year: 1989,
//   calcAge: function () {
//     return 2037 - this.year;
//   },
// };
// jonas.calcAge(); // 48

//LECTURE: The this keyword in practice

// console.log(this); // window object

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); // outputs undefined in strict mode
// };

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); // uses lexical keyword 'this' of window keyword
//   // outputs window
// };
// calcAgeArrow(1991);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this); // logs the jonas object bc jonas was the object calling the function -- see below for the function call
//     console.log(2037 - this.year);
//   },
// };

// jonas.calcAge(); // logs the jonas object bc jonas was the object calling the function

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge; // method borrowing

// matilda.calcAge(); // the 'this' keyword now points to matilda
// // the this keywords always points to the object that is calling the method

// const f = jonas.calcAge; // not calling function

// console.log(f);
// f(); // outputs undefined --> this is now undefined
// // no longer attached to an object, there is now no owner.

// LECTURE: Regular Functions vs. Arrow Functions

// Pitfalls of the this keyword related to regular functions
// and arrow functions

// var firstName = 'Matilda';

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     // console.log(this); // logs the jonas object bc jonas was the object calling the function -- see below for the function call
//     console.log(2037 - this.year);

//     // solution 1, pre-ES6 in order to use this inside of a function expression
//     // const self = this; // self or that
//     // const isMillennial = function () {
//     //   console.log(self);
//     //   console.log(this); // undefined
//     //   console.log(this.year >= 1981 && this.year <= 1996);
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     //   // outputs the jonas object because self is defined outside of function, and then JS does variable lookup
//     // };

//     // solution 2
//     // does not need this extra 'self' variable to use 'this'
//     // this works because this arrow function uses the this keyword fron the parent scope, which is jonas
//     const isMillennial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillennial();
//   },
//   // a regular function gets its own 'this' keyword, an arrow function, like the one below, does not
//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };

// // the const is still within the global scope and is not a
// // code block, the below function uses the this keyword
// // from the global scope

// jonas.greet(); // outputs 'Hey undefined'
// // an arrow function does not get its own this keyword.
// console.log(this.firstName); // undefined, bc this is 'window' and window has no firstName property, unless it is declared with var.

// // you should never ever use an arrow function as a method.
// // just use a function expression instead

// jonas.calcAge();

// arguments keyword, something that functions also get access to
// only available in regular functions and function expressions

// const addExpr = function (a, b) {
//   console.log(arguments); // logs array with 2 and 5
//   // useful for when we need a function to accept more parameters
//   // than we actually specified
//   return a + b;
// };

// addExpr(2, 5); // 2,5 in array
// addExpr(2, 5, 8, 12); // 2, 5, 7, 12

// // however, the arrow function does NOT get the arguments keyword

// var addArrow = (a, b) => {
//   console.log(arguments);
//   // error, arguments is not defined
//   return a + b;
//   // have to specifically return the function when more than one line in an arrow function.
//   // else ... => a + b w/o return
// };

// addArrow(2, 5, 8);

// LECTURE: Primitives vs. Objects (Primitize vs. Reference Types)
// differences between how these are stored in memory

// primitives are numbers, strings, booleans.ect

// let age = 30;
// let oldAge = age; // age still 30 at this point
// age = 31;

// console.log(age); // 31
// console.log(oldAge); // 30

// //

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Friend:', friend); // 'Jonas', age: 27
// console.log('Me:', me); // 'Jonas', age: 27 instead of 30.

// why it works this way (above)

// primitives
// number, string, boolean, undefined, null, synbol, BigInt
// stored in call stack, or in the execution contexts inside the call stack

// objects
// object literal, arrays, functions, many more...
// stored in the memory heap

// when talking about memory and memory management, its usual
// to call primitives 'primitive types' and objects 'reference types'

// how reference values in memory work, and why we got 27 and 27 for ages in the object example above //
// the piece of memory in the call stack has a reference to the piece of memory in the heap that holds our 'me' object
// thats why we can them reference types
// they could be too large to be stored in the call stack, the heap has pretty much infinite space
// the 30 is changed to a 27 because friend and me are pointing at the same address, which references the same address in the heap, all we did was change the value in the heap

// NOTE:: it is a misconception that all variables declared with const are immutable. that is only true for PRIMITIVE values, not REFERENCE values

// three more topics for later

// 1. Prototypal Inheritance --> Object Oriented Programming with JS
// 2. Event Loop --> Asynchronous JS: Promises, Async/Await and AJAX
// 3. How the DOM Really Works --> Advanced DOM and Events

// LECTURE: Primitives vs. Objects in Practice

// primitives

// let lastName = 'Williams';
// let oldLastName = lastName;
// lastName = 'Davis';

// console.log(lastName); // Davis
// console.log(oldLastName); // Williams

// // objects

// const jessica = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
// };

// const marriedJessica = jessica;

// // looks like we are copying jessica, we are really just copying the reference which will then point to the same object

// marriedJessica.lastName = 'Davis';

// console.log('Before marriage:', jessica); // "Jessica", "Davis"
// console.log('After marriage:', marriedJessica); // "Jessica", "Davis"
// // works this way because we are pointing to the same object and we replace the object value.
// // when we attempted to copy the original one, it did not create a new object in the heap. it simply another variable in the stack which holds the reference to the original object.
// // two different names for the same thing

// // marriedJessica = {}; // not allowed

// // copying objects

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// if we wanted to merge two objects, we could use function object.Assign, which merges two objects and returns a new one

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marriage:', jessica2); // "Jessica", "Williams", family has 4 people
console.log('After marriage:', jessicaCopy); // "Jessica", "Davis", family has 4 people

// this is how you can preserve the last name of the first one
// and that this mean that jessicaCopy is a real copy of the original.
// behind the scenes, a new object was created in the heap and jessicaCopy is now pointing to the new object.

// however, there is still a problem. it only works on the first level, if we had an object inside an object, the inner object would still be the same, and unchanged.

// object.assign only creates a shallow copy, and not a deep clone.
// a shallow copy will only copy the properties in the first level, whereas a deep clone will copy everything.

// even before the marriage, the jessica2 still gets assigned the additional marriage people. when we changed the family in one, we did it in both because it is nested
