/*  ********************
    Coding Challenge 1
    ********************
*/

// BMI calculator

/* 
    **********
    Data Set 1
    **********
*/

// let weightMark = 78;
// let heightMark = 1.69;

// let weightJohn = 92;
// let heightJohn = 1.95;

// /* function wasn't part of challenge
// but i wrote it to make calc easier */

// function calculateBMI(mass, height) {
//   return mass / height ** 2;
// }

// //needed to add return to get number out of function.

// //calculate Mark's BMI
// let markBMI = calculateBMI(weightMark, heightMark);

// //calculate John's BMI
// let johnBMI = calculateBMI(weightJohn, heightJohn);

// let markHigherBMI = markBMI > johnBMI;
// //is mark's first BMI measurement higher than john's first?
// console.log(markHigherBMI);

/* 
    **********
    Data Set 2
    **********
*/

// weightMark = 95;
// heightMark = 1.88;

// weightJohn = 85;
// heightJohn = 1.76;

// //calculate Mark's BMI
// markBMI = calculateBMI(weightMark, heightMark);
// console.log(markBMI);

// //calculate John's BMI
// johnBMI = calculateBMI(weightJohn, heightJohn);

//renamed variable to doesMarkHigherBMI from input form Jesse
// doesMarkHigherBMI = markBMI > johnBMI;
// //is mark's second BMI measurement higher than john's second?
// console.log(markHigherBMI);

/*  ********************
    Coding Challenge 2
    ********************
*/

// if (markBMI > johnBMI) {
//   console.log(
//     `Mark's BMI of ${markBMI} is higher than John's! BMI of ${johnBMI}!`
//   );
// } else {
//   console.log(
//     `John's BMI of ${johnBMI} is higher than Mark's BMI of ${markBMI}!`
//   );
// }

/*  ********************
    Coding Challenge 3
    ********************
*/

/* 
    **********
    Test Data 1
    **********
*/

// let dScore1 = 96;
// let dScore2 = 108;
// let dScore3 = 89;

// let kScore1 = 88;
// let kScore2 = 91;
// let kScore3 = 110;

// function averageScore(score1, score2, score3) {
//   return (score1 + score2 + score3) / 3;
// }

// let dAverageScore = averageScore(dScore1, dScore2, dScore3);

// console.log(dAverageScore);

// let kAverageScore = averageScore(kScore1, kScore2, kScore3);

// console.log(kAverageScore);

// if (dAverageScore > kAverageScore) {
//   console.log(
//     `The Dolphin's win with the highest average score of ${dAverageScore}!`
//   );
// } else if (dAverageScore === kAverageScore) {
//   console.log(`Tie! No one wins!`);
// } else {
//   console.log(
//     `The Koalas win with the highest average score of ${kAverageScore}!`
//   );
// }

//BONUS 1, min score of 100 to win, also has to be
//higher than other team

/* 
    **********
    Test Data Bonus 1
    **********
*/

// dScore1 = 97;
// dScore2 = 112;
// dScore3 = 101;

// kScore1 = 109;
// kScore2 = 95;
// kScore3 = 123;

// dAverageScore = averageScore(dScore1, dScore2, dScore3);

// console.log(dAverageScore);

// kAverageScore = averageScore(kScore1, kScore2, kScore3);

// console.log(kAverageScore);

// if (dAverageScore > kAverageScore && dAverageScore >= 100) {
//   console.log(
//     `The Dolphin's win with the highest average score of ${dAverageScore}!`
//   );
// } else if (dAverageScore === kAverageScore) {
//   console.log(`Tie! No one wins!`);
// } else if (kAverageScore > dAverageScore && kAverageScore >= 100) {
//   console.log(
//     `The Koalas win with the highest average score of ${kAverageScore}!`
//   );
// } else {
//   console.log(`No team wins!`);
// }

// BONUS 2, min score also applies to a draw. draw only
// happens when both teams have same score and both have a
// score greater or equal to 100. otherwise, no team wins
// the trophy

// dScore1 = 97;
// dScore2 = 112;
// dScore3 = 101;

// kScore1 = 109;
// kScore2 = 95;
// kScore3 = 106;

// dAverageScore = averageScore(dScore1, dScore2, dScore3);

// console.log(dAverageScore);

// kAverageScore = averageScore(kScore1, kScore2, kScore3);

// console.log(kAverageScore);

// if (dAverageScore > kAverageScore && dAverageScore >= 100) {
//   console.log(
//     `The Dolphin's win with the highest average score of ${dAverageScore}!`
//   );
// } else if (
//   dAverageScore === kAverageScore &&
//   dAverageScore &&
//   kAverageScore >= 100
// ) {
//   console.log(`Tie! No one wins!`);
// } else if (kAverageScore > dAverageScore && kAverageScore >= 100) {
//   console.log(
//     `The Koalas win with the highest average score of ${kAverageScore}!`
//   );
// } else {
//   console.log(`There is no tie, but neither team wins!`);
// }

/*  ********************
    Coding Challenge 4
    ********************
*/

//tip calculator, 15% tip if the check is between $50 and $300, else 20%
//print string with bill, tip, and final value
//using if, else statement not allowed. ternary operator only

/* 
    **********
    Test Data 1
    **********
*/

// bill values are 275, 40, and 430

// let bill;
// let tip;
// let total;

// //made a function to calculate tip based on bill amount and
// //tip conditions
// function calculateTip(bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// //bill of 275
// bill = 275;
// tip = calculateTip(bill);

// total = bill + tip;

// console.log(
//   `The bill was ${bill}, the tip was ${tip} and the total value is ${total}.`
// );

// //bill of 40
// bill = 40;
// tip = calculateTip(bill);

// //redefine total variable, b/c total has previous value from
// //above
// total = bill + tip;

// console.log(
//   `The bill was ${bill}, the tip was ${tip} and the total value is ${total}.`
// );

// //bill of 430
// bill = 430;
// tip = calculateTip(bill);

// total = bill + tip;

// console.log(
//   `The bill was ${bill}, the tip was ${tip} and the total value is ${total}.`
// );
