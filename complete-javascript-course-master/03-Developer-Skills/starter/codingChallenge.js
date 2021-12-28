/*  ********************
    Coding Challenge 1
    ********************
*/

/* Given an array of forecasted maximum temperatures,
the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17C in 1 days, 21C in 2
days, ... 23C in 3 days..."

Create a function 'printForecast' which takes in an array 'arr'
and logs a string like the above to the console.

Use the problem solving framework: Understand the problem
and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

// Thinking thru problem, breaking into smaller pieces.
/* Each array temp has a position, which for how it should
be presented is +1 to the indice, i. 17 in 1 days is at pos 0
so we can add 1 to each position and display that as the day
value. */

let testData1 = [17, 21, 23];
let testData2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
  for (i = 0; i < arr.length; i++) {
    let numDays = i + 1;
    console.log(`...${arr[i]}C in ${numDays} days...`);
  }
}

printForecast(testData1);
printForecast(testData2);

// 1) Understanding the problem
// -- Array transformed into a string, separated by ...
// -- What is X days? Answer: i + 1

// 2) Breaking up into sub-problems
// -- Transform array into string
// -- Transform each element to string with C
// -- Strings need to contain day (i + 1)
// -- Add .. between elements and start and end of string
// -- Log string to console

// Answer:

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

function printForecastAnswer(arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str = str + `${arr[i]}C in ${i + 1} days ... `;
  }
  console.log("..." + str);
}

printForecastAnswer(data1);
printForecastAnswer(data2);
