// let js = "amazing";
// console.log(40 + 8 + 23 + 10);

// console.log("Jonas");
// console.log(23);

// let firstName = "Jonas";

// console.log(firstName);

// let myFirstJob = "memer";
// let myCurrentJob = "professional memer";

// console.log(myCurrentJob + " " + myFirstJob);

/*
    Data Types
*/

// let javascriptIsFun = true;
// console.log(javascriptIsFun);

// console.log(typeof true);
// console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof "Joe");

// javascriptIsFun = "Yes!";
// console.log(typeof javascriptIsFun);

// let year;
// console.log(year);
// console.log(typeof year);

// year = 1991;
// console.log(typeof year);

// console.log(typeof null);

/*
    Basic Operators
*/

// const now = 2037;

// const ageJoe = now - 1997;
// const ageSarah = now - 2018;

// console.log(ageJoe, ageSarah);

// console.log(ageJoe * 2, ageJoe / 10, 2 ** 3); //2 ** 3 means to 2 to the power of 3 = 2 * 2 * 2.

// const firstName = "Joe";
// const lastName = "Watkins";

// console.log(firstName + lastName);
// console.log(firstName + " " + lastName);

// assignment operators

// let x = 10 + 5;
// x += 10; //x = x + 10 = 25
// x *= 4; //x = x * 4 = 100
// x++; //x = x + 1
// x--; //x = x - 1
// x--; //x = x - 1
// console.log(x);

// comparison operators

// console.log(ageJoe > ageSarah);
// console.log(ageJoe < ageSarah);
// >, <, >=, <=

// console.log(ageSarah >= 18);
// console.log(ageSarah <= 18);

// const isFullAge = ageSarah >= 18;

// const now = 2037;
// const ageJoe = now - 1997;
// const ageSarah = now - 2018;

// console.log(now - 1991 > now - 2021);

/*
    Operator Precedence
*/

// const now = 2037;
// const ageJoe = now - 1997;
// const ageSarah = now - 2018;

// console.log(now - 1991 > now - 2021);

// let x, y;

// x = y = 25 - 10 - 5;
// console.log(x, y);

// const averageAge = (ageJoe + ageSarah) / 2;
// console.log(averageAge);
// console.log(ageJoe, ageSarah);

/*
    Strings and Template Literals
*/

// const firstName = "Joe";
// const job = "Programmer";
// const birthYear = 1997;
// let currentYear = 2021;
// let currentAge = currentYear - birthYear;

// const joe =
//   "I'm " + firstName + ", a " + currentAge + " year-old who is a " + job + ".";

// console.log(joe);

// const joeNew = `I'm ${firstName}, a ${currentAge} year-old who is a ${job}.`;
// console.log(joeNew);
// //template literal made with backticks, near curly line

// console.log(`String
// multiple
// lines`);

/*
    Taking Decisions: if / else Statements
*/

// let age = 15;
// const drivingAge = 18;

// if (age >= 18) {
//   console.log(`Yay, you can drive!`);
// } else {
//   let yearsLeft = 18 - age;
//   console.log(
//     `You're not old enough to drive. Only ${yearsLeft} years until you can drive.`
//   );
// }

// const birthYear = 1997;
// let century;

// if (birthYear <= 2000) {
//   century = 20;
// } else {
//   century = 21;
// }

/*
    Type Conversion and Coercion
*/

// //type conversion
// const inputYear = "1991";
// console.log(Number(inputYear) + 18);
// // Number() converts a string input to a number

// console.log(inputYear + 18);
// //outputs 199118

// console.log(Number("Jonas"));
// //output NaN, short for 'not a number'. Is an invalid number.

// console.log(String(23));
// //String() converts a number input to a string

// //type coercion
// console.log("I am " + 23 + " years old");
// //this converts the number value to string

// console.log("23" - "10" - 3);
// //this converts the strings to numbers, outputs number of 10
// //because the MINUS operator was used

// console.log("23" + "10" + 3);
// //this converts the only number to a string, and concatenates all of the stings together, outputs string of 23103
// //because the PLUS operator was used, and plus can be used to add numbers OR add strings together, such as
// // in sentences, so JS converts them all to strings and concatenates them. This is the only use in which
// //JS converts the numbers in "" to strings. All other operations convert them to numbers.

// console.log("23" * "10" * 3);
// //this converts the strings to a number, outputs 690
// //because the MULTIPLY operator was used, and that math is the only way the multiply operator is used, so
// //JS converts the result to a number.

// console.log("23" / "10" / 3);
// //this converts the strings to a number, outputs .7666 repeating
// //because the DIVIDE operator was used, and that math is the only way the divide operator is used, so
// //JS converts the result to a number.

// console.log("23" > "18");
// //this converts the strings to a number, outputs true
// //because a LOGICAL operator was used, JS converts the result to a number.

// let n = "1" + 1; //n = "11", as a string
// n = n - 1; //n = "11" - 1, converts to number = 10.
// console.log(n);

/*
    Truthy and Falsy Values
*/

// console.log(Boolean(0)); //false
// console.log(Boolean(undefined)); //false
// console.log(Boolean("Jonas")); //true
// console.log(Boolean({})); //empty object, outputs true
// console.log(Boolean(""));

// let money = 0.00001;

// if (money) {
//   console.log(`Don't spend it all`);
// } else {
//   console.log(`You should get a job`);
// }

// let height;

// if (height) {
//   console.log(`yay height is defined`);
// } else {
//   console.log(`height is undefined`);
// }

/*
    Equality Operators: == vs. ===
*/

// let age = "18";

// if (age === 18) console.log(`you are an adult now strict`);

// if (age == 18) console.log(`you are an adult now loose`);

// let favoriteNumber = Number(prompt(`what is your favorite number`));

// console.log(favoriteNumber); //number as a string
// console.log(typeof favoriteNumber); //confirms string

// if (favoriteNumber === 23) {
//   //'23' == 23
//   console.log("Cool, 23 is an amazing number");
// } else if (favoriteNumber == 7) {
//   console.log(`7 is also a cool number`);
// } else {
//   console.log(`number is not 23 or 7`);
// }

// if (favoriteNumber !== 23) {
//   console.log(`why not 23`);
// }

/*
    Logical Operators
*/

// let hasDriversLicense = true; // A
// let hasGoodVision = true; // B

// console.log(hasDriversLicense && hasGoodVision);

// console.log(hasDriversLicense || hasGoodVision);

// console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) {
//   console.log(`sarah is able to drive`);
// } else {
//   console.log(`someone else should drive`);
// }

// let isTired = true; // C

// console.log(hasDriversLicense && hasGoodVision && isTired);

// if (hasDriversLicense && hasGoodVision && !isTired) {
//   console.log(`sarah is able to drive`);
// } else {
//   console.log(`someone else should drive`);
// }

/*
    Switch Statements
*/

// let day = "Sunday";

// switch (day) {
//   case "Monday": //same as writing day === 'Monday', does strict equality operator ===
//     console.log(`Plan course structure!`);
//     console.log(`Go to coding meetup`);
//     break;
//   case "Tuesday":
//     console.log("Prepare theory videos");
//     break;
//   case "Wednesday":
//   case "Thursday":
//     console.log(`Write code examples.`);
//     break;
//   case "Friday":
//     console.log(`Record videos`);
//     break;
//   case "Saturday":
//   case "Sunday":
//     console.log(`Enjoy the weekend`);
//     break;
//   default:
//     console.log(`Not a valid day!`);
// }

// in-lecture challenge

// if (day === "Monday") {
//   console.log(`Plan course structure!`);
//   console.log(`Go to coding meetup`);
// } else if (day === "Tuesday") {
//   console.log("Prepare theory videos");
// } else if (day === "Wednesday" || day === "Thursday") {
//   console.log(`Write code examples.`);
// } else if (day === "Friday") {
//   console.log(`Record videos`);
// } else if (day === "Saturday" || day === "Sunday") {
//   console.log(`Enjoy the weekend`);
// } else {
//   console.log(`Not a valid day!`);
// }

/*
    Statements and Expressions
*/

// let me = "Joe";
// console.log(`I'm ${2021 - 1997} years old. My name is ${me}.`);

/*
    The Conditional (Ternary) Operator
*/

// let age = 23;

// //ternary operator, meaning three parts, condition, if, and else
// age >= 18
//   ? console.log(`I like to drink wine`)
//   : console.log(`I like to drink water`);

// let drink = age >= 18 ? "wine" : "water";
// console.log(drink);

// //more code way

// let drink2;

// if (age >= 18) {
//   drink2 = "wine";
// } else {
//   drink2 = "water";
// }

// console.log(drink2);

// console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);
