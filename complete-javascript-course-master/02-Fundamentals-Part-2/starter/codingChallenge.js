/*  ********************
    Coding Challenge 1
    ********************
*/

//two teams, dolphins and koalas, they compete 3 times, avg
//score among the three competitions is calculated for each
//team, a team only wins if it has at least double the average
//score of the other team, else no team wins. draws ignored.

// let calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// /*
//     ***********
//     Test Data 1
//     ***********
// */

// //Dolphins scores of 44, 23, 71. Koala scores 65, 54, 49.

// let dAverageScore = calcAverage(44, 23, 71);
// let kAverageScore = calcAverage(65, 54, 49);

// function checkWinner(avgDolphins, avgKoalas) {
//   if (avgDolphins >= 2 * avgKoalas) {
//     console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//   } else if (avgKoalas >= 2 * avgDolphins) {
//     console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
//   } else {
//     console.log(`No team wins!`);
//   }
// }

// checkWinner(dAverageScore, kAverageScore);

// /*
//     ***********
//     Test Data 2
//     ***********
// */

// //Dolphins scores of 85, 54, 41. Koala scores 23, 34, 27.

// dAverageScore = calcAverage(85, 54, 41);
// kAverageScore = calcAverage(23, 34, 27);

// checkWinner(dAverageScore, kAverageScore);

/*  ********************
    Coding Challenge 2
    ********************
*/

// function calculateTip(bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// console.log(calculateTip(100)); // 15

// /*
//     ***********
//     Test Data 1
//     ***********
// */

// // bills of 125, 555, 44

// let bills = [125, 555, 44];

// let tip1 = calculateTip(bills[0]);
// let tip2 = calculateTip(bills[1]);
// let tip3 = calculateTip(bills[2]);

// let tips = [tip1, tip2, tip3];

// console.log(tips);

// /*
//     Bonus
// */

// let total = [bills[0] + tip1, bills[1] + tip2, bills[2] + tip3];

// console.log(total);

/*  ********************
    Coding Challenge 3
    ********************
*/

// //Mark and John BMI comparing -- use objects to implement
// //their calculations. BMI = mass / height ** 2, mass in kg
// //height in m

// //1. create an object with properties for their full name, mass,
// //and height. (Mark Miller and John Smith)

// //2. Create a calcBMI method on each object to calc their BMI.
// //Store the BMI value to a property and return it from the
// //method.

// //3. Log to the console who has the higher BMI, together with
// //the full name and respective BMI.
// //example: "John's BMI (28.3) is higher than Mark's (23.9)!"

// /*
//     ***********
//     Test Data 1
//     ***********
// */

// //mark --> weight = 78kg, height = 1.69m
// //john --> weight = 92kg, height = 1.95m

// let mark = {
//   firstName: "Mark",
//   lastName: "Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.BMI = this.mass / this.height ** 2;
//     return this.BMI;
//   },
// };

// mark.calcBMI();

// console.log(mark.BMI);

// let john = {
//   firstName: "John",
//   lastName: "Smith",
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.BMI = this.mass / this.height ** 2;
//     return this.BMI;
//   },
// };

// john.calcBMI();

// console.log(john.BMI);

// if (mark.BMI > john.BMI) {
//   console.log(
//     `${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI}) is higher than John's (${john.BMI})!`
//   );
// } else if (john.BMI > mark.BMI) {
//   console.log(
//     `${john.firstName} ${john.lastName}'s's BMI (${john.BMI}) is higher than Mark's (${mark.BMI})!`
//   );
// } else {
//   console.log(`Both of their BMIs are the same!`);
// }

/*  *******************
    Coding Challenge 4
    *******************
*/

//improve steven's tip calc with loop

//create array bills containing all 10 test data values
//22, 295, 176, 440, 37, 105, 10, 1100, 86, 52

let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];

function calculateTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

//push tips and totals to their arrays based on
//bill values
for (let i = 0; i < bills.length; i++) {
  tips.push(calculateTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}

console.log(tips);
console.log(totals);

//bonus

//create function to calculate average of all
//amounts in specified array
function calcAverage(arr) {
  let sum = 0;
  for (i = 0; i < arr.length; i++) {
    sum = arr[i] + sum;
  }
  sum = sum / arr.length;
  return sum;
}

console.log(calcAverage(totals));
