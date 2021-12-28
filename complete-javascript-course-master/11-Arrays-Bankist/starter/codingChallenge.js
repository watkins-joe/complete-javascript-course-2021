'use strict';

// ////////////////////////
// // CODING CHALLENGE 1 //
// ////////////////////////

// // Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// // about their dog's age, and stored the data into an array (one array for each). For
// // now, they are just interested in knowing whether a dog is an adult or a puppy.
// // A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// // old.
// // Your tasks:
// // Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// // ('dogsJulia' and 'dogsKate'), and does the following things:
// // 1. Julia found out that the owners of the first and the last two dogs actually have
// // cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// // ages from that copied array (because it's a bad practice to mutate function
// // parameters)
// // 2. Create an array with both Julia's (corrected) and Kate's data
// // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// // is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// // �
// // ")
// // 4. Run the function for both test datasets
// // Test data:
// // § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// // § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// // Hints: Use tools from all lectures in this section so far �
// // GOOD LUCK �

// // check if dog is adult or puppy based on its age
// // adult if age is at LEAST 3 years old
// // puppy if it is LESS than 3 years old

// // Test data 1:

// const juliaData1 = [3, 5, 2, 12, 7];
// const kateData1 = [4, 1, 15, 8, 3];

// function checkDogs(dogsJulia, dogsKate) {
//   // create shallow copy of Julia's array
//   let juliaDataCopy = dogsJulia;
//   // remove first and last two entries from Julia's data
//   let juliaDataCopyCorrected = juliaDataCopy.slice(1, -2); // 5, 2
//   // can also use splice method like so:
//   // splice(0, 1);
//   // splice(-2);
//   // combine julia's now corrected array with kate's
//   let dogAges = juliaDataCopyCorrected.concat(dogsKate);
//   // check array concats correctly with both data sets
//   console.log(dogAges);
//   // output string based on each dog age
//   dogAges.forEach(function (dogAge, i) {
//     if (dogAge >= 3) {
//       console.log(`Dog number ${i + 1}
//       is an adult, and is ${dogAge} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy
//     `);
//     }
//   });
// }

// checkDogs(juliaData1, kateData1);

// // Test data 2:
// const juliaData2 = [9, 16, 6, 8, 3];
// const kateData2 = [10, 5, 6, 1, 4];

// checkDogs(juliaData2, kateData2);

// ////////////////////////
// // CODING CHALLENGE 2 //
// ////////////////////////

// // Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// // dog ages to human ages and calculate the average age of the dogs in their study.
// // Your tasks:
// // Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// // ages ('ages'), and does the following things in order:
// // 1. Calculate the dog age in human years using the following formula: if the dog is
// // <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// // humanAge = 16 + dogAge * 4
// // 2. Exclude all dogs that are less than 18 human years old (which is the same as
// // keeping dogs that are at least 18 years old)
// // 3. Calculate the average human age of all adult dogs (you should already know
// // from other challenges how we calculate averages �)
// // 4. Run the function for both test datasets
// // Test data:
// // § Data 1: [5, 2, 4, 1, 15, 8, 3]
// // § Data 2: [16, 6, 10, 5, 6, 1, 4]
// // GOOD LUCK �

// const calcAverageHumanAge = function (ages) {
//   // log ages array input into function
//   // console.log(ages);
//   let dogsToHumanAges = ages.map(function (dogAge) {
//     // log each age inside of ages array
//     // console.log(dogAge);
//     // create humanAge variable
//     let humanAge;
//     if (dogAge <= 2) {
//       return (humanAge = 2 * dogAge);
//     } else if (dogAge > 2) {
//       return (humanAge = 16 + dogAge * 4);
//     }
//   });

//   console.log(dogsToHumanAges);

//   // filter all dogs that are less than 18 human years old
//   let dogs18OrOlder = dogsToHumanAges.filter(function (humanAge) {
//     if (humanAge >= 18) return humanAge;
//   });
//   console.log(dogs18OrOlder);

//   // reduce array of 18+ human years old dogs to one value
//   let totalHumanAge = dogs18OrOlder.reduce(function (acc, curr) {
//     // log, check if accumulator and current value are
//     // being added normally
//     console.log(acc, curr);
//     return acc + curr;
//   }, 0);
//   // calculate average age of dogs in 18+ array
//   let averageHumanAge = totalHumanAge / dogs18OrOlder.length;
//   // log average human age
//   console.log(averageHumanAge);
// };

// let dogAges1 = [5, 2, 4, 1, 15, 8, 3];
// calcAverageHumanAge(dogAges1);
// // average dog -> human age is 44

// let dogAges2 = [16, 6, 10, 5, 6, 1, 4];
// calcAverageHumanAge(dogAges2);
// // average dog -> human age is 47.333333333333336

// // CODING CHALLENGE SOLUTION:

// // coding challenge code, for reference:

// let dogAges1 = [5, 2, 4, 1, 15, 8, 3];
// let dogAges2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge2 = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   console.log(average);
// };

// calcAverageHumanAge2(dogAges1); // 44
// calcAverageHumanAge2(dogAges2); // 47.333333333333336

// ////////////////////////
// // CODING CHALLENGE 3 //
// ////////////////////////

// // Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// // as an arrow function, and using chaining!
// // Test data:
// // § Data 1: [5, 2, 4, 1, 15, 8, 3]
// // § Data 2: [16, 6, 10, 5, 6, 1, 4]

// let dogAges1 = [5, 2, 4, 1, 15, 8, 3];
// let dogAges2 = [16, 6, 10, 5, 6, 1, 4];

// // const calcAverageHumanAge2 = function (ages) {
// //   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
// //   const adults = humanAges.filter(age => age >= 18);
// //   console.log(humanAges);
// //   console.log(adults);

// //   const average = adults.reduce(
// //     (acc, age, i, arr) => acc + age / arr.length,
// //     0
// //   );

// //   console.log(average);
// // };

// const calcAverageHumanAge2 = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge2(dogAges1);
// const avg2 = calcAverageHumanAge2(dogAges2);

// console.log(avg1, avg2);

////////////////////////
// CODING CHALLENGE 4 //
////////////////////////

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) �
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects �)
// The Complete JavaScript Course 26
// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them �
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.
// Test data:
//  const dogs = [
//  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//  { weight: 8, curFood: 200, owners: ['Matilda'] },
//  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//  { weight: 32, curFood: 340, owners: ['Michael'] },
//  ];
// GOOD LUCK �

// Test data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.)

// weight as a parameter is unsed in for each loop,
// but it is referenced as a property. could reassign weight
// param to a throwaway variable like _
dogs.forEach(function (weight, i, arr) {
  // grab each dogs weight
  console.log(arr[i].weight);
  // calculate recommendedFood based on forumla and weight
  let recommendedFood = arr[i].weight ** 0.75 * 28;
  // log result to each calculation
  console.log(recommendedFood);
  // add result of each calculation to each dog object as
  // a new property called recommendedFood
  dogs[i].recommendedFood = recommendedFood;
});

// lecture answer //
// dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** .75 * 28))
// console.log(dogs)

// verify new property added to dogs array
console.log(dogs);

// 2.) Find Sarah's dog -- log to console if its eating too
// much or too little food.

// function to detemine if dog is eating too much or too
// little food

const checkFoodIntake = function (currFood, recFood) {
  if (currFood > recFood * 0.9 && currFood < recFood * 1.1) {
    console.log('Your dog is eating just the right amount!');
  } else if (currFood > recFood) {
    console.log('Your dog is eating too much!');
  } else if (currFood < recFood) {
    console.log('Your dog is eating too little!');
  }
};

// Find Sarah in the dogs array, in the dog object where
// she is an owner.

// make sure for of loop functionality works how i expect
for (let dog of dogs) {
  console.log(dog.owners);
}

// finding sarah in the dog object, in the owners array
// inside the whole dogs array
for (let dog of dogs) {
  if (dog.owners.includes('Sarah')) {
    console.log('found sarahs dog'); // true

    // find index of dog in dogs array that includes Sarah
    let sarahsDogIndex = dogs.findIndex(
      dog => dog.owners.includes('Sarah') === true
    );
    console.log(sarahsDogIndex);

    // checking sarah's dog's food intake with
    checkFoodIntake(
      dogs[sarahsDogIndex].curFood,
      dogs[sarahsDogIndex].recommendedFood
    );

    // stop loop when we find sarah's dog, if exists
    break;
  } else {
    console.log('did not find sarah');
  }
}

// lecture answer //
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(dogSarah);
// console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'}`)

// 3.) Create an array containing the names of all owners of
// dogs who eat too much and too little.

let ownersEatTooMuch = dogs.flatMap(dog =>
  // returns owners of dogs, or nothing in new array
  dog.curFood > dog.recommendedFood ? dog.owners : []
);

// lecture answer //:
// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners)
// console.log(ownersEatTooMuch)

console.log(ownersEatTooMuch);

let ownersEatTooLittle = dogs.flatMap(dog =>
  // returns owners of dogs, or nothing in new array
  dog.curFood < dog.recommendedFood ? dog.owners : []
);

console.log(ownersEatTooLittle);

// lecture answer //
// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners)
// console.log(ownersEatTooMuch)


// making sure initial dogs array was not mutated
console.log(dogs); // was not mutated

// 4.) Log a string for each array created in #3, like this:
// "Matilda and Alice and Bob's dogs eat too much!"
// and "Sarah and John and Michael's dogs eat too little!"

let str = ownersEatTooMuch.join(' and ');

console.log(`${str}'s dogs eat too much!`);

str = ownersEatTooLittle.join(' and ');

console.log(`${str}'s dogs eat too little!`);

// lecture answer //
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`)
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`)

// using join method with and and spaces ' ' seems
// unnecessarily messy and complicated but im sure
// this is how they wanted me to do it.

// 5.) Log to the console whether there is any dog eating
// exactly the amount of food that is recommended. (just
// true or false)

// manually check dogs array if there are any amounts of food
// that satisfy condition, and there are none.
console.log(dogs);

for (let dog of dogs) {
  if (dog.curFood === dog.recommendedFood)
    // if true, log true
    console.log(dog.curFood === dog.recommendedFood);
  else {
    // if false, log false
    // can this be made better?
    console.log(dog.curFood === dog.recommendedFood);
  }
}

// lecture answer //
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood))

// for of loop confirms that there is none.

// 6.) Log to the console whether there is any dog eating
// an okay the amount of food. (just true or false)

// an 'okay' amount of food means an amount of currFood
// being within 90% and 110% of the recommendedFood for that
// dog and their specific weight.

for (let dog of dogs) {
  // assign calcs to min and max amount of food a dog can
  // eat to be considered OK
  let minOKFood = dog.recommendedFood * 0.9; // 90% of rec
  let maxOKFood = dog.recommendedFood * 1.1; // 110% of rec

  if (dog.curFood > minOKFood && dog.curFood < maxOKFood) {
    // verify manually that curFood falls between accepted
    // range of being OK food amount, print amounts
    console.log(minOKFood, dog.curFood, maxOKFood);
    // log result of the if statement, as question wants
    // true or false
    // can this be made better?
    console.log(dog.curFood > minOKFood && dog.curFood < maxOKFood);
  } else {
    // else, log dog food amounts, where they should fall
    // and what their curFood amount is
    console.log(minOKFood, dog.curFood, maxOKFood);
  }
}

// lecture answer //
// const checkEatingOkay = dog => dog.curFood > dog.recommendedFood * .9 && dog.curFood < dog.recFood * 1.1

// console.log(dogs.some(checkEatingOkay));


// 7.) Create an array containing the dog(s) that are eating
// an okay amount of food.

let dogsOkayFood = dogs.flatMap(function (dog) {
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  )
    return dog;
  else {
    return [];
  }
});

// new array with only one dog

console.log(dogsOkayFood);

// lecture answer //
// console.log(dogs.filter(checkEatingOkay))

// 8.) Create a shallow copy of the 'dogs' array and sort it
// by recommended food portion in ASCENDING order, keeping
// in mind that the portions are inside the array's objects.

let dogsCopy = [...dogs];

// logs unsorted shallow copy
console.log(dogsCopy);

// sorts by recommendedFood property value
dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood);

// logs sorted shallow copy, ascending by recommendedFood
// property value.
console.log(dogsCopy);

// lecture answer //
// const dogsCopy = dogs.slice().sort((a,b) => a.recommendedFood - b.recommendedFood)
// console.log(dogsCopy)