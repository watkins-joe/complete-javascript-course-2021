'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Creating DOM Elements Lecture

const displayMovements = function (movements, sort = false) {
  // empty transaction history elements before adding fresh
  containerMovements.innerHTML = '';

  // sorting functionality

  // creating a copy of the movements array using slice
  // as we don't want to mutate the original movements
  // array in the account object
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `

      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
      </div>
      
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// calculate and display current balance

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// display money going in
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;
  // removes negative symbol on withdrawals, too

  // let interestRate = 1.2 / 100; // .012
  // console.log(interestRate);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // interest only calculated on amounts above one dollar
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// create usernames function

const createUsernames = function (acc) {
  acc.forEach(function (acc) {
    // using for each method to add a new property called
    // username for each person object, does not return
    // new array which is why we did not user a map
    acc.username = acc.owner
      // lower case person's name
      .toLowerCase()
      // split into new array, each new element separated by space
      .split(' ')
      // map array into new array with only first letter
      .map(
        word => word[0]
        // grab first letter of each element in array
      )
      // join each letter into its own string, as username
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

// Event handlers

// Event handler forfor login

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  console.log('LOGIN');

  // find account with username inputted

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // log current account owner to console based on
  // username input
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // check if current account exists, and if it does
    // check its pin against inputted pin -- using
    // optional chaining

    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // Make PIN field lose focus on login
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Event handler for Transfer functionality

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    // check if amount to be transferred is greater than zero
    amount > 0 &&
    // check if receiver account exists
    receiverAcc &&
    // check if current account balance is greater than or
    // equal to amount being transferred
    currentAccount.balance >= amount &&
    // check if the username of recipient of the transfer
    // is different than the current account's username to
    // prevent money transferring to yourself
    receiverAcc?.username !== currentAccount.username
  ) {
    // perform transfer, update movements array for each
    // account in the transfer

    // negative amount in FROM account
    currentAccount.movements.push(-amount);
    // positive amount in TO account
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// Event handler for Request loan functionality

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  //
  const amount = Number(inputLoanAmount.value);

  // using some method to test for loan parameter that requires
  // a deposit in the account to equal 10% of the requested loan
  // amount
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add loan as deposit
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

// Event handler for Close account functionality

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Check if credentials are correct
  if (
    // Check if current account username === to what was entered
    // into username deletion field
    currentAccount.username === inputCloseUsername.value &&
    // Check if current account pin === to what was entered
    // into pin deletion field
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // using splice method to delete account from accounts
    // array

    // find index of currentAccount
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // log index of current account
    console.log(index);

    // Delete current account from accounts array
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    console.log('Account deletion functionality working');
  } else {
    console.log('Wrong username and/or password. Try again.');
  }

  // Clear delete input fields
  inputCloseUsername.value = inputClosePin.value = '';

  //////////// FEATURE(S) I ADDED BELOW ////////////
  // Change welcome message back to log in
  labelWelcome.textContent = 'Log in to get started';
});

// Event handler for Sorting movements functionality

// use state variable to check if we are sorting array
// currently or not.
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // !sorted = do the opposite of sorted
  displayMovements(currentAccount.movements, !sorted);
  // !sorted = do the opposite of sorted
  // true to false, false to true.ect
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// // LECTURE: Simple Array Methods
// // arrays are object, they have their own functions called methods

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE method
// // extract part of an array without changing the entire array

// console.log(arr.slice(2)); // c, d, e
// // starts at 2 and returns all the rest including 2 and after 2

// console.log(arr.slice(2, 4)); // c, d
// // starts at 2 and stops at position 4, and does not include
// // the endind position

// console.log(arr.slice(-2)); // d,e
// // grabs last two items in array
// console.log(arr.slice(-1)); // e
// // grabs last item in array

// console.log(arr.slice(1, -2)); // b, c
// // starts at 1, extracts everything except the last two

// // creating shallow copy of array

// console.log(arr.slice());
// console.log([...arr]); // as we learned in last sections

// // SPLICE method
// // does actually change original array, mutates original array

// // console.log(arr.splice(2)); // c,d,e
// // extracts elements starting at position 2
// arr.splice(-1); // removes last element
// console.log(arr);
// // mutated array now does not have c d and e, it was spliced

// arr.splice(1, 2);
// // starting at position 1 but not including position 1,
// // deleted two elements to the right of position 1
// console.log(arr); // only a, d left

// // REVERSE
// // reverses an array, and DOES mutate the original array!
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse());

// console.log(arr2);

// // CONCAT
// // concatenates/combines two arrays
// // first array is on which the method is called, second is the
// // one we pass into concat method
// const letters = arr.concat(arr2);
// console.log(letters);

// console.log([...arr, ...arr2]); // yields same result
// // using the spread operator into a new array

// // JOIN
// console.log(letters.join(' - '));
// // result is a string
// // output a - b - c - d - e - f - g - h - i - j

// // LECTURE: Looping Arrays: forEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   // first item is index, then element.
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// // using forEach method to achieve same thing, in easier way
// // forEach is technically a higher order function that req.
// // a callback function in order to tell it what to do
// console.log('-----FOR EACH-----');

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });
// // forEach passes in each item into the function as an argument

// // 0: function(200)
// // 1: function(450)
// // 2: function(-400)

// // what if we need a counter variable in a forEach?
// // can add them and can do that.
// // can do that, as forEach has access to all three -->
// // the element, the index of the element, and the array itself
// // in that order. they have to be in that order. thats the order
// // in which the arguments are passed into our callback function

// // when to use forEach vs for of loop?
// // you CANNOT break out of a forEach loop. continue and break
// // statements DO NOT work, and forEach will ALWAYS loop over
// // the ENTIRE array.

// // if you need to break out of a loop, you need to use a
// // for of loop.

// // LECTURE: forEach with Maps and Sets

// // Maps -->

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   // usd is key, and next element is value
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}, ${map}`);
// });

// // Sets -->

// // Set -- remember only unique values allowed. duplicates
// // deleted
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${_}: ${value}, ${map}`);
// });
// // a Set doesn't have keys, it also doesn't have indexes either.
// // so there is no value that would make sense for the key.
// // essentially, the key makes no sense at all.

// // we can use a _ to replace the key, as JS considers it a
// // throwaway variable

// LECTURE: Project: "Bankist" App

// overview of app we will build

// LECTURE: Creating DOM Elements

// created dom elements above in bankist code

// // LECTURE: Data Transformations: Map, Filter, Reduce

// // Map

// // Used to loop over arrays, similar to forEach. Map creates
// // a brand new array based on the original array.
// // Takes an array and loops over the array and in each iteration,
// // it applies a callback function that we specify in our code
// // to the current array element.
// // the map method "maps" the values of the original array to a new array

// // such as multiplying each item in the array times 2.
// // current * 2

// // Filter
// // Filters for elements in the original array that satisfy a
// // certain condition

// // such as finding items in an array that are greater than 2
// // returns a new array with elements that are only greater than
// // 2, current > 2

// // Reduce
// // Boils down all elements in original array to one single
// // value, and returns this value

// // such as adding all of the elements in an array together
// // to one single value, with accumulator variable
// // acc + currentElement

// // LECTURE: The Map Method

// // the map method will give us a brand new array which will
// // contain in each position, the results of applying a
// // callback function to the original array elements

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // assume movements are in Euros, and we want to convert to
// // USD, and lets assume one Euro = $1.1 USD.

// const eurToUsd = 1.1;

// // using function declaration as callback function
// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// // using arrow function as callback function
// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// // using for of statement
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescs = movements.map((mov, i) => {
//   return `Movement ${i + 1}: You ${
//     mov > 0 ? 'deposited' : 'withdrew'
//   } ${Math.abs(mov)}`;
// });

// // difference between for each and map method

// // forEach method creates SIDE effects. In each of the iterations
// // we performed some action that was then visible in the console

// // but with the map method, all we did was to return each of the
// // strings from the callback and added them to a new array.
// // here in this map method, we did not create a side effect
// // in each of the iteration, all we did was to build a new
// // array

// // it is OK to have more than one return statement in a function
// // so as long as only ONE returns at a time, like in an if, else
// // statement. its impossible for both to return to them at the
// // same time

// console.log(movementsDescs);

// // LECTURE: Computing Usernames

// // create usernames function
// const createUsernames = function (acc) {
//   acc.forEach(function (acc) {
//     // using for each method to add a new property called
//     // username for each person object, does not return
//     // new array which is why we did not user a map
//     acc.username = acc.owner
//       // lower case person's name
//       .toLowerCase()
//       // split into new array, each new element separated by space
//       .split(' ')
//       // map array into new array with only first letter
//       .map(
//         word => word[0]
//         // grab first letter of each element in array
//       )
//       // join each letter into its own string, as username
//       .join('');
//   });
// };
// // using map and for each methods.

// // username is just the initials of each of the users

// createUsernames(accounts);
// console.log(accounts);

// // LECTURE: The Filter Method

// // used to filter for elements that satisfy a certain condition

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);

// // filter out negative values
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);
// // now, deposits array only contains positive
// // values now because of the filter method. it also creates
// // new array

// // for loop method instead of using filter method
// const depositsFor = []; // create new empty array
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// // create an array of the withdrawals with filter method
// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });

// // again, using for of loop for withdrawals
// console.log(withdrawals);
// // logs new withdrawals array with only number less than zero
// const withdrawalsFor = [];
// for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
// console.log(withdrawalsFor);

// // LECTURE: The Reduce Method

// // boils down all elements in an array to one single value
// // unlike other methods, the callback function in the reduce
// // method parameters are somewhat different.

// // ie (curr, i, arr)

// // the first parameter is the accumulator (acc), or a snowball
// // that keeps accumulating of all of the elements added together

// // the other parameters are the same -->
// // (curr, i, arr)

// // the final callback functon for the reduce method looks like:
// // function (acc, curr, i, arr);
// // finally, the reduce method has an initial value parameter,too
// // that you can specify where the accumulator starts adding from
// // which is placed after the curly bracket, after a comma, before
// // closing parenthesis of reduce method. if none is specified,
// // it defaults to zero.

// // reduce also loops over the array and calls the CB function
// // in each iteration

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);

// const balance = movements.reduce(function (acc, curr, i, arr) {
//   // checking the math of the reduce method on each iteration
//   console.log(`Iteration ${i}: ${acc} + ${curr}`);
//   // return updated accumulator value plus value of current
//   // element
//   return acc + curr;
// });

// // using arrow function:
// const balanceArrow = movements.reduce(
//   (acc, curr) => acc + curr
//   // checking the math of the reduce method on each iteration
//   // return updated accumulator value plus value of current
//   // element
// );

// console.log(balanceArrow);

// // doing same thing, but manually with for loop
// let balanceFor = 0;
// for (const mov of movements) balanceFor += mov;
// console.log(balance); // 3840

// // can also do other stuff with reduce
// // get maximum value of movements array

// const max = movements.reduce((acc, mov) => {
//   // if acc > than movement, return acc
//   if (acc > mov) return acc;
//   // else return the movement value
//   else return mov;
// }, movements[0]);

// console.log(max);

// // LECTURE: The Magic of Chaining Methods

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// // PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * eurToUsd)
//   // can use the arr in the map
//   // and other methods to debug if there are errors
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

// // LECTURE: The Find Method

// // we can use find method to retrieve one element in an array
// // based on a condition

// // unlike the FILTER method, the find method will not return
// // a new array, will only return the FIRST element in an array
// // that satisfies the current condition

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(firstWithdrawal);
// // -400, as it is the first element that satisfies the
// // condition of being less than 0.

// // two fundamental differences between FIND and FILTER methods
// // 1.) Filter returns ALL elements that match the conditions
// // while FIND only returns the first
// // 2.) Filter returns a NEW array, find ONLY returns one element

// console.log(accounts);

// // we can find an object in an array based on some property
// // of said object

// const account = accounts.find(acc => acc.owner == 'Jessica Davis');
// console.log(account);

// LECTURE: Implementing Login
// done

// LECTURE: The FindIndex Method
// good use case in our application is the close account
// feature, that will return the index of the found element,
// and not the element itself.

// // LECTURE: The Some and Every Methods

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // EQUALITY

// console.log(movements);
// console.log(movements.includes(-130)); // true
// // returns true or false if any value in the array is exactly
// // equal to -130. testing for equality.
// // test if array has certain value

// // what if we wanted to test for a condition instead?

// // that's where the some method comes into play

// // we would like to know if there have been any deposits in
// // a certain account, any number above zero.

// // 'SOME' METHOD, CONDITIONS

// let anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits); // true

// // using some instead of includes to check for certain value
// // just as an example.
// anyDeposits = movements.some(mov => mov === -130);
// console.log(anyDeposits); // true

// // test if any deposits above 5000
// anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits); // false

// // test if any deposits above 1500
// anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits); // true

// // EVERY METHOD

// // the EVERY method returns true if and only if the condition
// // is true

// // if all of the elements in the array satisfy the condition
// // we pass in, ie if every element passes the test, returns TRUE

// // check if every event in the movements array is a deposit
// // ie is above zero
// console.log(movements.every(mov => mov > 0)); // false

// // account 4 has all deposits
// console.log(account4.movements.every(mov => mov > 0)); // true

// // we can write functions separately and pass the function
// // as a callback

// // Separate callback function
// const deposit = mov => mov > 0;

// console.log(movements.some(deposit)); // true
// console.log(movements.every(deposit)); // false
// console.log(movements.filter(deposit)); // [200, 250, 3000, 70, 1300]

// // LECTURE: flat and flatMap

// // flat and flatMap were introduced in ES6 2019. -- are very new

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // assume we have an array with arrays inside of it

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// // what if we wanted to take all of these elements in the nested
// // arrays into one big array with numbers from 1 to 8?

// // use the new, flat method.

// console.log(arr.flat()); // [1,2,3,4,5,6,7,8]
// // flattened the array, removed the nested arrays. no
// // callback function this time

// // what about an array with much deeper-nested arrays?

// let arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

// console.log(arrDeep.flat()); // [[1,2], 3,4,[5,6],7,8]

// // flat method only goes one level deep.
// // use depth argument, as 1 is the default depth to flatten
// // otherwise, specify depth to flatten, or how deep to go
// // into array to flatten the nested arrays. an array inside
// // of an array is considered depth 1.

// console.log(arrDeep.flat(2)); // [1,2,3,4,5,6,7,8].

// // real life example:
// // bankist app wants to calculate the overall balance of all
// // movements of all of the accounts.

// // place all movements in an array

// const accountMovements = accounts.map(acc => acc.movements);

// console.log(accountMovements);

// const allMovements = accountMovements.flat();

// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance); // 17840

// // using chaining

// const overallBalance2 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   // flattening with only one level of depth, as you can see
//   // in allMovements array
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance2); // 17840

// // can also use flatMap method
// // flatMap combines the flat and map methods together for
// // better performance

// // NOTE: flatMap ONLY goes one level deep in flattening array
// // therefore, if you need to go deeper than one level, you need
// // to use the flat method and specify the depth.

// // using flatMap

// const overallBalance3 = accounts
//   .flatMap(acc => acc.movements)
//   // flattening with only one level of depth, as you can see
//   // in allMovements array
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance3); // 17840

// // LECTURE: Sorting Arrays

// // we will use javascripts built-in sort method

// // sort() method can sort numerically highest to lowest,
// // can sort alphabetically

// // NOTE:
// // the sort() method MUTATES the array that it was called on

// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // mutated the owners array

// // Numbers
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);
// console.log(movements.sort());
// // numbers are not at all ordered in any way, the sort method
// // does the soritng based on strings. it converts everything
// // to strings and does the sorting itself based on the
// // string values of the numbers. that's why the minus is
// // first, then the one after the negative, 4 after the negative
// // 6 after the negative, then 1 in 1300, then 2 in 200, 3 in
// // 3 300, 4 in 450, 7 in 70.

// // we have to fix this by passing a compare callback function
// // into the method

// // two parameters, first value (a) is current value and second
// // value (b) is the next value in array. ie, they are two
// // consecutive numbers in the array.

// // return < 0, then A before B. (keep order)
// // return > 0, then B before A. (switch order)

// // ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

// // this can be simplified if sorting numbers --
// // if we are looking for a to be greater than b and return
// // a positive number, that would be a - b
// // if we are looking for b to be greater than a and return
// // a negative number, that would still be a - b

// movements.sort((a, b) => a - b);
// console.log(movements);
// // this may works the same as the above line 907 code
// // and sorts movements array in ascending order

// console.log(movements);
// // [-650, -400, -130, 70, 200, 450, 1300, 3000]
// // array is now sorted in ascending order

// // switched around the return values of 1, -1 to make values
// // descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });

// console.log(movements);
// // [3000, 1300, 450, 200, 70, -130, -400, -650]
// // array is now sorted in descending order

// // if we are looking for b to be greater than a and return
// // a positive number, that would be b - a
// // if we are looking for a to be greater than b and return
// // a negative number, that would still be b - a

// movements.sort((a, b) => b - a);
// console.log(movements);
// // this may works the same as the above line 929 code
// // and sorts movements array in descending order

// // with a mixed array of strings and numbers, sort is not
// // advised to be used.

// // LECTURE: More Ways of Creating and Filling Arrays

// // how to programmatically create and fill arrays

// const arr = [1, 2, 3, 4, 5, 6, 7];

// // Empty arrays + fill method
// const x = new Array(7);
// // creates new array with 7 empty spots if we only pass in
// // one argument.
// console.log(x);

// // can't really use the x array to use map to fill it

// console.log(x.map(() => 5)); // does not work

// // can use fill method to fill array
// // mutates underlying array
// // console.log(x.fill(1)); // [1,1,1,1,1,1,1]
// // x.fill(1, 3); // begins filling at position 3
// x.fill(1, 3, 5); // begins filling 1 at position 3, stops and
// // does not include position 5 and beyoind
// console.log(x);

// //
// arr.fill(23, 2, 6);
// console.log(arr); //[1, 2, 23, 23, 23, 23, 7]

// // create arr array programmatically

// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y); // [1, 1, 1, 1, 1, 1, 1]
// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
// console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// // Real world use case of Array.from function
// // was introduced to create arrays from array-like structures

// // assume the movements of accounts are not stored in an array
// // and we need to get them from the UI HTML and do calcs
// // based on that

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     element => Number(element.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

// // recap
// // we used array.from to create an array from the result of
// // the querySelectorAll, which is a node list, which is not
// // really an array, but is an array-like structure. that
// // array like structure can easily be converted to an array
// // using array.from. then, we included a mapping function
// // that transforms that initial array to an array exactly
// // as we wanted. converting the raw HTML element to its
// // textContent to a number and replacing the EURO sign
// // with nothing using replace(). then, we ended up with
// // the array of numbers/movements that we wanted.

// LECTURE: Summary: Which Array Method to Use?

//

/// "I want..." ///

//

//// To MUTATE ORIGINAL array ////

// Add to original
// .push (to end)
// .unshift (start)

// Remove from original
// .pop (from end)
// .shift (from start)
// .splice (from anywhere)

// Others
// .reverse
// .sort
// .fill

//// A new array ////

// Computed from original
// .map (loop)

// Filtered using condition
// .filter

// Portion of original
// .slice

// Adding original to another array
// .concat

// Flattening the original (MUTATES)
// .flat
// .flatMap

//// An array index ////

// Based on value
// .indexOf

// Based on test condition
// .findIndex

//// An array element ////

// Based on test condition
// .find

//// Know if array includes ////

// Based on value
// .includes

// Based on test condition
// .some
// .every

//// A new string ////

// Based on separator string
// .join

//// To transform to value ////

// Based on accumulator
// .reduce
// (Boil down array to single value of any type: number,
// string, boolean, or even new array or object)

//// To just loop array ////

// Based on callback
// .forEach
// (Does not create a new array, just loops over it)
