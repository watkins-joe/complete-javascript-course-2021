// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// PROBLEM 1:
/* We work for a company building a smart home thermostat. Our
most recent task is this: "Given an array of termperatures of
one day, calculate the temperature ampliture. Keep in mind
that sometimes there might be a sensor error." */

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is the temp amplitude? Answer: difference in highest
// and lowest temperatures
// - How to compute max and min temperatures?
// - What's a senseor error? And what to do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in array
// - Subtract min from max (amplitude) and return it

// const calcAmplitude = function (temps) {
//   let max = temps[0];
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     let curTemp = temps[i];
//     if (typeof curTemp !== "number") continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };

// calcAmplitude([3, 7, 4]);
// // max = 3
// // max = 7
// // max = 7
// // min = 3

// calcAmplitude(temperatures);

// const amplitude = calcAmplitude(temperatures);
// console.log(amplitude);

// PROBLEM 1:
// Function should now receive two arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice?
// NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

// const calcAmplitude2 = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = temps[0];
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     let curTemp = temps[i];
//     if (typeof curTemp !== "number") continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };

// const amplitude2 = calcAmplitude2([3, 0, 5], [5, 0, 12, 324]);
// console.log(amplitude2);

// const measureKelvin = function () {
//   const measurement = {
//     type: "temp",
//     unit: "celsius",

//     // C) FIX
//     value: Number(prompt("Degress celcius:")),
//      value: 10,
//   };

//   console.log(measurement);
//   // B) FIND THE BUG
//   console.table(measurement);

//   //   console.log(measurement.value);
//   //   console.warn(measurement.value);
//   //   console.error(measurement.value);
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };
// // A) IDENTIFY BUG
// console.log(measureKelvin());

// Bug was concatenating number 273 + prompt input as string,
// combining two into larger string, ie "10273".

// Using a debugger
const calcAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;
  for (let i = 0; i < temps.length; i++) {
    let curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeBug = calcAmplitudeBug([3, 0, 5], [5, 4, 12, 324]);
// A) IDENTIFY
console.log(amplitudeBug);
