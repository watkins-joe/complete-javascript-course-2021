//JavaScript Fundamentals - Part 2

//LECTURE: Functions

// function describeCountry(country, population, capitalCity) {
//   console.log(
//     `${country} has ${population} people and its capital city is ${capitalCity}`
//   );
// }
// let country1 = describeCountry("USA", 330000000, "Washington");
// let country2 = describeCountry("France", 16000000, "Paris");
// let country3 = describeCountry("Germany", 7000000, "Berlin");

//LECTURE: Function Declarations vs. Expressions

// let worldPopulation = 7900;

// //declarations

// function percentageOfWorld1(population) {
//   return (population / worldPopulation) * 100;
// }

// let usaPopPercent = percentageOfWorld1(330);
// console.log(
//   `The US accounts for ${usaPopPercent} percent of the world's population.`
// );
// let francePopPercent = percentageOfWorld1(16);
// console.log(
//   `France accounts for ${francePopPercent} percent of the world's population.`
// );
// let germanyPopPercent = percentageOfWorld1(13);
// console.log(
//   `Germany accounts for ${germanyPopPercent} percent of the world's population.`
// );

// //expressions

// let percentageOfWorld2 = function (population) {
//   return (population / worldPopulation) * 100;
// };

// usaPopPercent = percentageOfWorld2(330);
// console.log(
//   `The US accounts for ${usaPopPercent} percent of the world's population.`
// );
// francePopPercent = percentageOfWorld2(16);
// console.log(
//   `France accounts for ${francePopPercent} percent of the world's population.`
// );
// germanyPopPercent = percentageOfWorld2(13);
// console.log(
//   `Germany accounts for ${germanyPopPercent} percent of the world's population.`
// );

//LECTURE: Arrow Function

// //rewrote previous function as an arrow function
// let percentageOfWorld3 = (population) => (population / worldPopulation) * 100;
// console.log(percentageOfWorld3(400));

//LECTURE: Functions Calling Other Functions

// let worldPopulation = 7900;

// function calcPercentageOfWorldPop(population) {
//   return (percentageOfWorldPop = (population / worldPopulation) * 100);
// }

// function describePopulation(country, population) {
//   calcPercentageOfWorldPop(population);
//   return `${country} has ${population} million people, which is about ${percentageOfWorldPop}% of the world.`;
// }

// console.log(describePopulation("China", 1441));
// console.log(describePopulation("USA", 330));
// console.log(describePopulation("France", 16));

//LECTURE: Introduction to Arrays

// let worldPopulation = 7900;

// function calcPercentageOfWorldPop(population) {
//   return (percentageOfWorldPop = (population / worldPopulation) * 100);
// }

// let populations = [330, 14, 7, 3.5];

// console.log(populations.length);

// if (populations.length != 4) {
//   console.log(`not 4`);
// } else {
//   console.log(`is 4`);
// }

// let percentages = [
//   calcPercentageOfWorldPop(populations[0]),
//   calcPercentageOfWorldPop(populations[1]),
//   calcPercentageOfWorldPop(populations[2]),
//   calcPercentageOfWorldPop(populations[3]),
// ];

// console.log(percentages);

//LECTURE: Basic Array Operations (Methods)

// let neighbours = ["Mexico", "Canada"];

// console.log(neighbours);

// neighbours.push("Utopia");

// console.log(neighbours);

// neighbours.pop("Utopia");

// console.log(neighbours);

// //if neighbors array does NOT include Germany
// if (!neighbours.includes("Germany")) {
//   console.log(`Probably not a central European country :D`);
// }

// console.log(neighbours.indexOf("Canada")); //1

// //position 1, delete 1 element, replace with
// //Kekistan
// neighbours.splice(1, 1, "Kekistan");

// console.log(neighbours);

//LECTURE: Introduction to Objects

// let myCountry = {
//   country: "United States",
//   capital: "Washington DC",
//   language: "English",
//   population: 330,
//   neighbours: ["Mexico", "Canada"],
// };

//LECTURE: Dot vs. Bracket Notation

// console.log(
//   `${myCountry.country} has ${myCountry.population} million people, ${myCountry.neighbours.length} neighbors, and a capital called ${myCountry.capital}.`
// );

// myCountry.population = myCountry.population + 2;

// console.log(myCountry.population);

// myCountry["population"] = myCountry["population"] - 2;

// console.log(myCountry.population);

//LECTURE: Object Methods

// let myCountry = {
//   country: "United States",
//   capital: "Washington DC",
//   language: "English",
//   population: 330,
//   neighbours: ["Mexico", "Canada"],
//   describe: function () {
//     console.log(
//       `${this.country} has ${this.population} million people, ${this.neighbours.length} neighbors, and a capital called ${this.capital}.`
//     );
//   },
//   checkIsland: function () {
//     this.isIsland = this.neighbours.length > 0 ? false : true;
//   },
// };

// myCountry.describe();

// myCountry.checkIsland();

// console.log(myCountry);

//LECTURE: Iteration: The for Loop

// for (let voteNumber = 1; voteNumber <= 50; voteNumber++) {
//   console.log(`Voter number ${voteNumber} is currently voting`);
// }

//LECTURE: Looping Arrays, Breaking and Continuing

// let populations = [330, 14, 7, 3.5];
// let percentages2 = [];

// let worldPopulation = 7900;

// function percentageOfWorld1(population) {
//   return (population / worldPopulation) * 100;
// }

// // calculate the percentages, push to new
// // percentages2 array
// for (i = 0; i < populations.length; i++) {
//   percentages2.push(percentageOfWorld1(populations[i]));
// }

// //using old "percentages" array from old
// //assignment, calc percentages and store them
// //to compare to other array
// let percentages = [
//   percentageOfWorld1(populations[0]),
//   percentageOfWorld1(populations[1]),
//   percentageOfWorld1(populations[2]),
//   percentageOfWorld1(populations[3]),
// ];

// //confirm both arrays have same
// //manually with log
// console.log(percentages);
// console.log(percentages2);

// // wasnt part of assignment, but i
// // created loop to AUTOMATICALLY
// // check if each item in each array
// // is the same instead of doing it
// // manually
// for (i = 0; i < percentages.length; i++) {
//   if (percentages[i] === percentages2[i]) {
//     console.log(`Element ${i} is identical in both arrays.`);
//   } else {
//     console.log(`Element ${i} is not the same as the other.`);
//   }
// }

//LECTURE: Looping Backwards and Loops in Loops

// let listOfNeighbours = [
//   ["Canada", "Mexico"], //0
//   ["Spain"], //1
//   ["Norway", "Sweden", "Russia"], //2
// ];

// //log only the neighbouring contries to the console
// //one by one, not the entire array. log a string like
// //'Neighbour: Canada; for each country.

// //neighboring countries in array have length > 1.
// //grab each positional array and if length > 1,
// //console.log listOfNeighborslistOfNeighbors[0]

// for (let i = 0; i < listOfNeighbours.length; i++) {
//   for (let y = 0; y < listOfNeighbours[i].length; y++) {
//     console.log(`Neighbor: ${listOfNeighbours[i][y]}`);
//   }
// }

/*
    ************
    END OF FUNDAMENTALS
    ASSIGNMENTS
    ************
*/
