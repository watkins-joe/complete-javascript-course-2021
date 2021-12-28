//JavaScript Fundamentals - Part 1

//LECTURE: Values and Variables
let country = "United States";
let continent = "North America";
let usPopulation = 330000000;

// console.log(country + " " + continent + " " + usPopulation);

//LECTURE: Data Types

let isIsland = false;
let language;

// console.log(typeof isIsland);
// console.log(typeof usPopulation);
// console.log(typeof country);
// console.log(typeof language);

//LECTURE: let, const and var

language = "English";
// const country = "United States";
// const continent = "North America";
//logs console error if you change an already-declared variable to a constant.

//LECTURE: Basic Operators

//1.
// let halfPopulation = usPopulation / 2;
// console.log(halfPopulation);

//2.
// console.log(usPopulation + 1);

//3.
// let finlandPopulation = 6000000;

// console.log(usPopulation > finlandPopulation);
//is US population greater than finland's

//4.
// let averagePopulation = 33000000;

// console.log(usPopulation < averagePopulation);
//does US have less people than average population?

//5.

// let description =
//   country +
//   " is in " +
//   continent +
//   ", and its " +
//   usPopulation +
//   " people speak " +
//   language;

// console.log(description);

/*
    Strings and Template Literals
*/

// description = `The ${country} is in ${continent} and its ${usPopulation} people speak ${language}.`;

// console.log(description);

/*
    Taking Decisions: if / else Statements
*/

// comparisonPopulation = usPopulation - averagePopulation;

// if (usPopulation > 33000000) {
//   console.log(
//     `${country}'s population is ${comparisonPopulation} above average.`
//   );
// } else {
//   console.log(
//     `${country}'s population is ${comparisonPopulation} below average.`
//   );
// }

// usPopulation = 13;

// comparisonPopulation = averagePopulation - usPopulation;

// if (usPopulation > 33000000) {
//   console.log(
//     `${country}'s population is ${comparisonPopulation} above average.`
//   );
// } else {
//   console.log(
//     `${country}'s population is ${comparisonPopulation} below average.`
//   );
// }

// usPopulation = 330000000;

/*
    Type Conversion and Coercion
*/

// my guesses
/*
1.1 = 4
1.2 = 617
1.3 = 23
1.4 = false
1.5 = 1143
*/

//

/*
    Equality Operators: == vs ===
*/

// let numNeighbors = Number(prompt(`How many neighbors does your country have?`));

// if (numNeighbors === 1) {
//   console.log(`Only 1 border!`);
// } else if (numNeighbors > 1) {
//   console.log(`More than 1 border`);
// } else {
//   console.log(`No borders`);
// }

//changing the == to === makes the string input '1' and
//number 1 not identical (===) and returns "no borders"

//converting the input prompt string to a number and
//entering one with === results in `only one border`
//printing because they are now exactly identical,
//the number 1 is === to the number 1

//we should use the === operator because we are asking
//the user for a numeric input in the question prompt
//and we need to process it as a number, else the
//program will not work as intended

/*
    Logical Operators
*/

//wants to live in country that speaks english, less than 50 mil people
//not an island.

// if (usPopulation < 50000000 && language === "English" && isIsland === true) {
//   console.log(`You should live in the US!`);
// } else {
//   console.log(`The US doesn't meet your criteria. :(`);
// }

/*
    Switch Statements
*/

// switch (language) {
//   case "chinese":
//   case "mandarin":
//     console.log(`MOST number of native speakers!`);
//     break;
//   case "spanish":
//     console.log(`2nd place in number of speakers`);
//     break;
//   case "english":
//     console.log(`3rd place`);
//     break;
//   case "hindi":
//     console.log(`Number 4`);
//     break;
//   case "arabic":
//     console.log(`5th most spoken language`);
//     break;
//   default:
//     console.log(`Great language too :D`);
// }

/*
    The Conditional (Ternary) Operator
*/

// usPopulation > 33000000
//   ? console.log(`The US' population is above average!`)
//   : console.log(`The US' population is below average!`);
