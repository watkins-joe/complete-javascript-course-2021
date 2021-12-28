/*
    Strict Mode
*/

"use strict";

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log(`I can drive`);

// const interface = "Audio";
// const private = 534;

/*
    Functions
*/

// //area between the { } is the function body
// function logger() {
//   console.log("My name is Jonas");
// }

// //calling, invoking, or running the function
// logger();

// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// //inputs are called the arguments
// const appleJuice = fruitProcessor(4, 5);
// console.log(appleJuice);

// let appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);

/*
    Function Declarations vs. Expressions
*/

// // function declaration, CAN be called before defined

// const age1 = calcAge1(1997);

// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }

// console.log(age1);

// // function expression, CANNOT be called before defined

// let calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };

// const age2 = calcAge2(1991);

// console.log(age2);

/*
    Arrow Functions
*/

// //arrow function

// //simpler version, only one parameter/argument
// const calcAge3 = (birthYear) => 2037 - birthYear;
// let age3 = calcAge3(1991);
// console.log(age3);
// //returns the value of 2037 - birthYear implicitly,
// //without having to write the return keyword, like
// //we had to before.

// //more complex version
// let yearsUntilRetirement = (birthYear, firstName) => {
//   let age = 2037 - birthYear;
//   let retirement = 65 - age;
//   return `${firstName} retires in ${retirement} years.`;
//   //   return retirement;
// };

// console.log(yearsUntilRetirement(1982, "Joe"));
// console.log(yearsUntilRetirement(1976, "Bob"));

/*
    Functions Calling Other Functions
*/

// //now lets consider that the fruit processor can only
// //make juice with smaller fruit pieces, and that we need
// //another function to chop of the fruit into smaller
// //pieces, and we are going to call this function inside
// //of the fruitProcessor function

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//   let applePieces = cutFruitPieces(apples);
//   let orangePieces = cutFruitPieces(oranges);

//   const juice = `Juice with ${applePieces}
//   pieces of apples and ${orangePieces}
//   pieces of orange.`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

/*
    Reviewing Functions
*/

// let calcAge = function (birthYear) {
//   return 2037 - birthYear;
// };

// //more complex version
// let yearsUntilRetirement = function (birthYear, firstName) {
//   let age = calcAge(birthYear);
//   let retirement = 65 - age;

//   if (retirement > 0) {
//     console.log(`${firstName} retires in ${retirement} years.`);
//     return retirement;
//   } else {
//     console.log(`${firstName} has already retired.`);
//     return -1;
//   }
// };

// console.log(yearsUntilRetirement(1991, "Joe"));
// console.log(yearsUntilRetirement(1950, "Mike"));

// //types of functions review

// //function declaration, can be called before declared
// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }

// //function expression, essentially a function value
// //stored in a variable
// let calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };

// //arrow function, great for a quick one-line function,
// //has no "this" keyword
// let calcAge3 = (birthYear) => 2037 - birthYear;

// //three different ways of writing a function, but they all
// //receive input data, transform data, and output data

/*
    Introduction to Arrays
*/

// let friend1 = "Michael";
// let friend2 = "Steven";
// let friend3 = "Peter";

// //literal syntax of making array
// const friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// let years2 = new Array(1991, 1984, 2008, 2020);

// //arrays are zero based,
// //the first item being position 0.
// console.log(friends[0]);
// console.log(friends[2]);

// //can get number of elements in array
// console.log(friends.length);

// //get last item in array
// console.log(friends[friends.length - 1]);

// //can mutate the array
// //arrays are not primitive values
// //they can be mutated
// friends[2] = "Jay";

// console.log(friends);

// //however we cannot replace
// //the entire array like so
// //if it is declared as a constant
// //it can be replaced if it
// //it is a variable

// // friends = ["Bob", "Alice"];

// //an array can hold values of
// //different types

// let firstName = "Joe";
// const joe = [firstName, "Watkins", 2021 - 1997, "Programmer", friends];

// console.log(joe);
// console.log(joe.length);

// //exercise
// function calcAge(birthYear) {
//   return 2037 - birthYear;
// }

// const years = [1990, 1967, 2002, 2010, 2018];

// console.log(calcAge(years));
// //outputs NaN, b/c argument is an array

// let age1 = calcAge(years[0]);
// let age2 = calcAge(years[1]);
// let age3 = calcAge(years[years.length - 1]);
// console.log(age1, age2, age3);

// const ages = [
//   calcAge(years[0]),
//   calcAge(years[1]),
//   calcAge(years[years.length - 1]),
// ];

// console.log(ages);

/*
    Basic Array Operations (Methods)
*/

// const friends = ["Michael", "Steven", "Peter"];

// // ** adding elements **

// // push function, adds item to
// // END of array
// const newLength = friends.push("Jay");

// // mutated array, and added 'Jay'
// console.log(friends);

// console.log(newLength);

// // unshift function, adds item to
// // BEGINNING of array
// friends.unshift("John");

// //splice, deletes and removes in specific location
// //position 1, delete 1 element, replace with
// //Kekistan
// neighbors.splice(1, 1, "Kekistan");

// console.log(friends);

// // ** removing elements **
// friends.pop(); // removes the last element in array
// console.log(friends);
// const popped = friends.pop();
// //saved last element in array to a const called popped, which
// //would be = to Peter, because he is getting removed since
// //he is last in array after Jay was removed with the first
// //friends.pop().
// console.log(popped);

// friends.shift(); // removes the last element in array

// console.log(friends);

// //["Michael", "Steven"]

// //logs position of element in the array, beginning with 0
// console.log(friends.indexOf("Steven")); // outputs 1

// //if we try same thing with element that is not in the array,
// //outputs -1.
// console.log(friends.indexOf("Bob")); // outputs -1

// //ES6 modern method --> friends.includes("elementName")
// //returns boolean true or false value if element is
// //inside of the specified array, but does not
// //return the position of element

// //includes uses STRICT equality operator ===,
// //does not coerce data type from str to number ect.

// friends.push(23);
// console.log(friends.includes("Steven")); //true
// console.log(friends.includes("Bob")); //false
// console.log(friends.includes("23")); //false

// if (friends.includes("Steven")) {
//   console.log(`you have a friend named steven`);
// }

/*
    Introduction to Objects
*/

// //jonas is the object, he has 5
// //properties

// //object literal syntax
// const jonas = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   age: 2021 - 1991,
//   job: "Teacher",
//   friends: ["Michael", "Peter", "Steven"],
// };

// //in objects, the order of the
// //properties does not matter
// //when we go to find or use them,
// //unlike in arrays

/*
    Dot vs. Bracket Notation
*/

// const jonas = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   age: 2021 - 1991,
//   job: "Teacher",
//   friends: ["Michael", "Peter", "Steven"],
// };

// console.log(jonas);

// //getting a property from an object

// //dot notation
// console.log(jonas.lastName);
// //we have to use the actual
// //property name as it appears
// //in the object

// //brackets notation
// console.log(jonas["lastName"]);

// /* the big difference the two
// is that with bracket notation
// we can put any expression we
// want in the brackets */
// const nameKey = "Name";

// console.log(jonas["first" + nameKey]);
// console.log(jonas["last" + nameKey]);
// //this would not work with
// //dot notation

// /* when we need to first compute
// property name, then we have to
// use bracket notation. in any
// other case, use dot notation. */

// //assume that we don't know what
// //property we want to show and
// //we get this info from a UI
// //prompt

// let interestedIn = prompt(
//   `What do you want to know about Jonas?
//   Choose between, firstName, lastName,
//   age, job, and friends.`
// );

// // console.log(jonas.interestedIn);
// //outputs undefined, as there is
// //no property that is called
// //interestedIn in the jonas
// //object

// //instead, use brackets notation.
// // console.log(jonas[interestedIn]);
// //outputs the requested property
// //that was typed into the prompt

// //if what the user types into
// //the prompt exists in the
// //jonas object, print it.
// if (jonas[interestedIn]) {
//   console.log(jonas[interestedIn]);
// } else {
//   console.log(
//     `Wrong request. Choose between, firstName, lastName, age, job, and friends.`
//   );
// }

// //adding property with dot
// //notation
// jonas.location = "Portugal";

// //adding property with bracket
// //notation
// jonas["twitter"] = "@jonasschmedtman";

// console.log(jonas);

// //challenge

// //"Jonas has 3 friends and his best friend is called Michael."

// console.log(
//   `${jonas.firstName} has ${jonas.friends.length} friends and his best friend is called ${jonas.friends[0]}.`
// );

/*
    Object Methods
*/

// const jonas = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   birthYear: 1991,
//   job: "Teacher",
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriversLicense: true,

//   //   calcAge: function (birthYear) {
//   //     return 2037 - birthYear;
//   //   },

//   //   calcAge: function () {
//   //     // console.log(this);
//   //     return 2037 - this.birthYear;
//   //   },

//   //function creating new property
//   //and storing it in jonas object
//   calcAge: function () {
//     this.age = 2037 - this.birthYear;
//     return this.age;
//   },

//   //this is equal to the
//   //object that is calling
//   //the method, in this
//   //case 'this' = jonas

//   //function declarations don't
//   //work in objects, you have
//   //to use a function expression

//   //challenge method input
//   getSummary: function () {
//     this.summary = `${this.firstName} is a ${this.age} year-old ${this.job},
//     and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
//     return this.summary;
//   },
// };

// //calling function of an
// //object
// console.log(jonas.calcAge());
// //only needed to calc age
// //once, and it is then stored
// //into a property that we can
// //now reference

// //most efficient solution

// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.age);

// console.log(jonas["calcAge"]());

// //Challenge

// //write a method called getSummary
// //and this method should return a string
// //which should return a string and
// //summarize the data about jonas

// //"Jonas is a 46 year-old teacher, and he
// //has a driver's license."

// console.log(jonas.getSummary());

// console.log(jonas.summary);

/*
    Iteration: The for Loop
*/

// // for loop keeps running while
// // logical condition is TRUE

// // use rep++, which is rep = rep + 1
// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}.`);
// }

/*
    Looping Arrays, Breaking and Continuing
*/

// const jonasArray = [
//   "Jonas",
//   "Schmedtmann",
//   2021 - 1991,
//   "Teacher",
//   ["Michael", "Peter", "Steven"],
//   true,
// ];

// const types = [];

// // console.log(jonas[0])
// // console.log(jonas[1])
// // ...
// // console.log(jonas[4])
// // jonasArray[5] does NOT exist

// // added true at [5], does not
// // print with hard-coded value

// //common var to start
// //counter at is "i"
// //also have to start i
// //at 0, b/c arrays start
// //at position 0

// //adding jonasArray.length
// //lets the for loop end
// //automatically based on
// //array's no. of elements
// for (let i = 0; i < jonasArray.length; i++) {
//   //reading from jonasArray array
//   console.log(jonasArray[i], typeof jonasArray[i]);

//   //filling types array with the
//   //name of the typeof data in
//   //jonas array at each position
//   //types[i] = typeof jonasArray[i];

//   //using push method
//   types.push(typeof jonasArray[i]);
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//   //pushes calculated age to ages array
//   //grabs years "age" at current position i
//   ages.push(2037 - years[i]);
// }

// console.log(ages);

// // continue

// console.log(`ONLY STRINGS`);
// for (let i = 0; i < jonasArray.length; i++) {
//   if (typeof jonasArray[i] !== "string") continue;
//   //if the current typeof data of element
//   //in array is NOT a string, continue to next
//   console.log(jonasArray[i], typeof jonasArray[i]);
// }

// // break
// console.log(`BREAK WITH NUMBER`);
// for (let i = 0; i < jonasArray.length; i++) {
//   if (typeof jonasArray[i] === "number") break;
//   //nothing else is printed after a number is found
//   console.log(jonasArray[i], typeof jonasArray[i]);
// }

/*
    Looping Backwards and Loops in Loops
*/

// const jonasArray = [
//   "Jonas",
//   "Schmedtmann",
//   2021 - 1991,
//   "Teacher",
//   ["Michael", "Peter", "Steven"],
//   true,
// ];

// // looping through array backwards 4->0
// // instead of forwards, 0->4

// // 4 is length of the array, which is 5 minus 5.
// // 5 items, but we start counting at 0.
// // KEEP THIS IN MIND ^^^^
// // we have to use the - 1 to get the last
// // item in the array which is at position 4,
// // even though we have 5 items in the array
// for (let i = jonasArray.length - 1; i >= 0; i--) {
//   console.log(i, jonasArray[i]);
// }

// // loop within a loop

// //outer loop runs once for every 5 times of inner
// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`----- Starting Exercise ${exercise} -----`);

//   //inner loop runs 5 times, goes back to outer for one loop
//   for (let rep = 1; rep <= 5; rep++) {
//     console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`);
//   }
// }

/*
    The while Loop
*/

// // let rep = 1;
// // while (rep <= 10) {
// //   console.log(`Lifting weights repetition ${rep}.`);
// //   rep++;
// // }

// let dice = Math.trunc(Math.random() * 6) + 1;

// //if ice ie 6 right away, there are 0 iterations of
// //the loop
// while (dice !== 6) {
//   console.log(`You rolled a ${dice}.`);
//   dice = Math.trunc(Math.random() * 6) + 1;
//   if (dice === 6) {
//     console.log(`Loop is about to end...`);
//   }
// }
// //the while loop does not have to repend on a counter
// //variable, whenever you do not know beforehand how many
// //iterations the loop will have. for example, we did not know
// //how many dice rolls it would take to get a 6.
