'use strict';

// ////////////////////////
// // CODING CHALLENGE 1 //
// ////////////////////////

// // Let's build a simple poll app!
// // A poll has a question, an array of options from which people can choose, and an
// // array with the number of replies for each option. This data is stored in the starter
// // 'poll' object below.
// // Your tasks:
// // 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// // method does 2 things:
// // 1.1. Display a prompt window for the user to input the number of the
// // selected option. The prompt should look like this:
// // What is your favourite programming language?
// // 0: JavaScript
// // 1: Python
// // 2: Rust
// // 3: C++
// // (Write option number)
// // 1.2. Based on the input number, update the 'answers' array property. For
// // example, if the option is 3, increase the value at position 3 of the array by
// // 1. Make sure to check if the input is a number and if the number makes
// // sense (e.g. answer 52 wouldn't make sense, right?)
// // 2. Call this method whenever the user clicks the "Answer poll" button.
// // 3. Create a method 'displayResults' which displays the poll results. The
// // method takes a string as an input (called 'type'), which can be either 'string'
// // or 'array'. If type is 'array', simply display the results array as it is, using
// // console.log(). This should be the default option. If type is 'string', display a
// // string like "Poll results are 13, 2, 4, 1".
// // 4. Run the 'displayResults' method at the end of each
// // 'registerNewAnswer' method call.
// // 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// // data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// // object! So what should the this keyword look like in this situation?

// // Test data for bonus:
// // § Data 1: [5, 2, 3]
// // § Data 2: [1, 5, 3, 9, 6, 1]
// // Hints: Use many of the tools you learned about in this and the last section �
// // GOOD LUCK �

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // display prompt, convert input from string to number
//     let inputNumber = Number(
//       prompt(
//         `${this.question} \n
//           ${this.options[0]} \n
//           ${this.options[1]} \n
//           ${this.options[2]} \n
//           ${this.options[3]} \n`
//       )
//     );

//     // verify input is a number
//     console.log(typeof inputNumber);

//     // log answers array before submission
//     console.log(this.answers);

//     // check if inputNumber is in fact a number, else invalid
//     if (typeof inputNumber === 'number' && inputNumber !== ' ') {
//       // check if inputNumber is number between 0 and 3
//       if (
//         inputNumber == 0 ||
//         inputNumber == 1 ||
//         inputNumber == 2 ||
//         inputNumber == 3
//       ) {
//         // increase answer choice 'selected' count in array by 1
//         this.answers[inputNumber] = this.answers[inputNumber] + 1;

//         // log updated answers array after submission and counting
//         console.log(this.answers);

//         alert('Thanks for your answer!');

//         this.displayResults();
//       } else {
//         // tell user to select one of the four numbers
//         // if any other number is input
//         alert('Invalid input. Please choose either 0, 1, 2, or 3.');
//       }
//     } else {
//       // tell user that somehow their input was not converted
//       // to a number
//       alert(
//         `Somehow, your input isn't a number or it's a space! You broke it! Nice job.`
//       );
//     }
//   },

//   displayResults() {
//     // display prompt, store input to typeInput
//     let typeInput = prompt(
//       `How do you want the poll results displayed? \n

//       If you want them as an array, type 'array' without quotation marks. \n
//       If you want them as a sentence/string, type 'string' \n
//       `
//     );

//     if (typeInput === 'array') {
//       alert(this.answers);
//     } else if (typeInput === 'string') {
//       alert(
//         // version that the lecture challenge wanted
//         // `Poll results are ${this.answers[0]}, ${this.answers[1]}, ${this.answers[2]}, ${this.answers[3]}.`

//         // updated verison, dynamically displays options instead of hard-coded
//         `Poll results are ${this.options[0].slice(3)}: ${
//           this.answers[0]
//         }, ${this.options[1].slice(3)}: ${
//           this.answers[1]
//         }, ${this.options[2].slice(3)}: ${
//           this.answers[2]
//         }, ${this.options[3].slice(3)}: ${this.answers[3]}.`
//       );
//     } else {
//       alert(`Invalid output type. Please try again.`);
//     }
//   },
// };

// // append event listener to button with .poll class
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// // bonus section

// // const displayResultsBonus = poll.displayResults();

// // let Data1 = [5, 2, 3];
// // let Data2 = [1, 5, 3, 9, 6, 1];

// // displayResultsBonus();

// // get this to work with outside data???

// // FIXME: below code works, asks for type of input, but does not
// // work if 'string' is typed. only array.
// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// // notes for fizzbuzz, reverse any given string

// // function reverseString (str) {
// //   splitString = str.split("");
// //   console.log(splitString);
// //   reverseArray = splitString.reverse();
// //   console.log(reverseArray);
// //   joinArray = reverseArray.join("");
// //   console.log(joinArray)
// //   return joinArray;
// // }

// // reverseString('Hello I like programming');

// // function fizzBuzz() {
// //   for(let i = 1; i < 101; i++){
// //     if (i % 15 == 0) console.log('FizzBuzz');
// //     else if (i % 5 == 0) console.log('Fizz');
// //     else if (i % 3 == 0) console.log('Buzz');
// //     else console.log(i);
// //   }
// // }

// // fizzBuzz();

// ////////////////////////
// // CODING CHALLENGE 2 //
// ////////////////////////

// // Your tasks:
// // 1. Take the IIFE below and at the end of the function, attach an event listener that
// // changes the color of the selected h1 element ('header') to blue, each time
// // the body element is clicked. Do not select the h1 element again!
// // 2. And now explain to yourself (or someone around you) why this worked! Take all
// // the time you need. Think about when exactly the callback function is executed,
// // and what that means for the variables involved in this example.
// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';

//   const body = document.querySelector('body');
//   body.addEventListener('click', function () {
//     header.style.color = 'blue';
//   });
// })();
// // GOOD LUCK �

// // the callback function is executed when the body is clicked on
// // but the IIFE function is executed on page load, as it
// // changed the text to red immediately.
// // im pretty sure the function inside the event listener
// // has closure and uses the variable from above

// // answer:
// // by the time this callback function is executed, the IFFE
// // is long gone and sits there waiting for an event to happen
// // the header is in the backpack of the addEventListener function
