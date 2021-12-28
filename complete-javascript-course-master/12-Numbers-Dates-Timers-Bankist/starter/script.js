'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-06-08T14:11:59.604Z',
    '2021-06-21T17:01:17.194Z',
    '2021-06-24T23:36:17.929Z',
    '2021-06-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency, // currency completely independent from locale itself
  }).format(value);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // old way of displaying dates w/o Intl API
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${month}/${day}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMovement = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When time is at zero seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer; // we have to return the timer
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimenting with API

// will eventually use internationlization to display dates depending
// on users location

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);

    // add date near current balance
    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${minute}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Start logout timer
    // clear timer if one is running/exists
    if (timer) clearInterval(timer);
    // start timer
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  // removed Number(), as Math.floor does type coercion
  // to a number for us

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// I did not replace 'Number' with plus sign

// 6-28-2020
// Added .toFixed(2) to all areas where a number/value is
// printed on screen to show all numbers with to the second
// decimal place. ie 25000 becomes 25000.00 and 14.9 becomes
// 14.90

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // LECTURE: Converting and Checking Numbers

// // in JS, javascript all numbers are represented internally
// // as floating points numbers (ie decimals) even if we write
// // them as integers

// console.log(23 === 23.0);

// // they are always stored in a binary form, or only composed
// // of zeros and ones.

// // Base 10 - 0 to 9 1/10 = 0.1, 3/10 = 3.33333333
// // Binary base 2 - 0 and 1

// // console.log(0.1 + 0.2); // 0.30000000000000004

// // this is why JavaScript is not recommended to be used for
// // financial stuff because of the hanging 4 at the end of
// // .1 + .2

// console.log(Number('23'));

// // using type coercion
// console.log(+'23');

// // Parsing
// // accepts 2nd argument, the radix, or the base of the numeral
// // system we are using
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e23', 10));

// console.log(Number.parseInt('2.5rem')); // 2
// console.log(Number.parseFloat('2.5rem')); // 2.5

// // older way of calling parseFloat, without 'Number' namespace
// console.log(parseFloat('2.5rem')); // 2.5

// // Check if value is value is not a number (NaN)
// // not a perfect way of checking is not a number
// console.log(Number.isNaN(20)); // false
// console.log(Number.isNaN('20')); // false
// console.log(Number.isNaN(+'20X')); // true
// console.log(Number.isNaN(23 / 0)); // false

// // better method => isFinite
// // Checking if value is a number
// // this is the best way
// console.log(Number.isFinite(20)); // true
// console.log(Number.isFinite('20')); // false
// console.log(Number.isFinite(+'20X')); // false
// console.log(Number.isNaN(23 / 0)); // false

// // Check if value is an integer
// console.log(Number.isInteger(23)); // true
// console.log(Number.isInteger(23.0)); // true
// console.log(Number.isInteger(23 / 0)); // false

// // LECTURE: Math and Rounding

// // square root function

// console.log(Math.sqrt(25)); // 5
// console.log(25 ** (1 / 2)); // 5
// // cubic root
// console.log(8 ** (1 / 3)); // 5

// // find max value in set of numbers
// console.log(Math.max(25, 3, 4, 2, 6)); // 25
// console.log(Math.max('25', 3, 4, 2)); // 25
// console.log(Math.max('25px', 3, 4, 2)); // NaN

// // find min value in set of numbers
// console.log(Math.min(5, 18, 23, 11, 2)); // 2

// // calculate radius of circle
// // this is how we calculate area of circle with x radius
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// // random number with random function

// console.log(Math.trunc(Math.random() * 6) + 1);
// // rolls from 1 to 6

// // generalized form to generate random numbers

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(3, 5));

// // Rounding integers
// // removes any decimal part
// console.log(Math.trunc(23.3)); // 23

// // rounds up or down to nearest whole integer
// console.log(Math.round(23.3)); // 23
// console.log(Math.round(23.5)); // 24
// console.log(Math.round(23.9)); // 24

// // rounds up to nearest whole integer
// console.log(Math.ceil(23.3)); // 24
// console.log(Math.ceil(23.9)); // 24

// // rounds down to nearest whole integer
// console.log(Math.floor(23.3)); // 23
// console.log(Math.floor(23.9)); // 23
// console.log(Math.floor('23.9')); // 23

// console.log(Math.trunc(-23.3)); // -23
// console.log(Math.floor(-23.3)); // -24

// // floor is a little better than trunc, bc it works with
// // all situations, no matter if we are working with positive
// // or negative numbers

// // Rounding floating point numbers/decimals

// console.log((2.7).toFixed(0)); // 3, as a string
// // toFixed always returns a string, not a number

// console.log((2.7).toFixed(3)); // 2.700, as a string
// console.log((2.7).toFixed(5)); // 2.70000, as a string
// console.log((2.7).toFixed(4)); // 2.7000, as a string

// // LECTURE: The Remainder Operator

// console.log(5 % 2); // 5 / 2, 2 with a remainder of 1, outputs 1
// console.log(7 % 3); // 1
// console.log(8 % 3); // 2

// // a number is even if it is divisible by 2, with no remainder
// console.log(6 % 2); // 0

// console.log(7 % 2);

// const isEven = n => n % 2 === 0;

// isEven(8); // true
// isEven(23); // false
// isEven(514); // true

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0, 2, 4, 6
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//     // at row 0, 3, 6, 9 .ect
//   });
// });

// // LECTURE: Working with BigInt
// // new in ES2020
// // numbers represented internally as 64 bits, 64 1s or 0s
// // only 53 bits are used to store digits themselves
// // rest are used for storing position of decimal and the sign
// // plur or minus

// // since there are only 53 bits used to store numbers,
// // there is a limit of how big numbers can be

// // we can calc this number
// console.log(2 ** 53 - 1); // 9007199254740991
// console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
// console.log(2 ** 53 + 1); // 9007199254740992
// console.log(2 ** 53 + 2); // 9007199254740994
// console.log(2 ** 53 + 3); // 9007199254740996
// console.log(2 ** 53 + 4); // 9007199254740996

// // a new primitive was added -- BigInt --
// // can be used to store numbers as big as we need

// console.log(91237162984716928376418237642871); // 9.123716298471693e+31
// console.log(91237162984716928376418237642871n); // 91237162984716928376418237642871n
// console.log(BigInt(91237162984)); // 91237162984n
// // appending n to the number makes it a BigInt, can also
// //use the BigInt function

// // Operations
// console.log(10000n + 10000n); // 20000n
// console.log(123094178234091823740129384729n * 29812398n);
// // 3669732632997682617886585789036070142n
// // console.log(Math.sqrt(16n)); // returns error

// // cannot
// const huge = 989872934829328342934879n;
// const num = 23;

// // console.log(huge * num);
// // Error: Cannot mix BigInt and other types

// console.log(huge * BigInt(num)); // this works

// // Exceptions
// // logical operators and string concatenations
// console.log(20n > 15); // works, is true
// console.log(20n === 20); // works, is false
// console.log(typeof 20n); // bigint

// console.log(huge + ' is REALLY big!!!');
// // outputs string 989872934829328342934879 is REALLY big!!!

// // Divisions
// console.log(11n / 3n); // 3n, cuts off decimal part
// console.log(10 / 3); // 3.3333333333333335

// // LECTURE: Creating Dates

// // Create a Date

// // 4 ways of creating dates

// // 1.)
// // const now = new Date();
// // console.log(now);

// // // 2.)
// // console.log(new Date('Tue Jun 29 2021 10:53:49'));
// // // can pass in how we want the date displayed, JS will parse
// // // it for us and display date
// // console.log(new Date('December 24, 2015'));

// // // trying to parse one of our account movementDates
// // console.log(new Date(account1.movementsDates[0]));
// // // outputs Mon Nov 18 2019 15:31:17 GMT-0600 (Central Standard Time)

// // console.log(new Date(2037, 10, 19, 15, 23, 5));
// // // Thu Nov 19 2037 15:23:05 GMT-0600 (Central Standard Time)
// // // months are zero based
// // console.log(new Date(2037, 10, 31, 15, 23, 5));
// // // Tue Dec 01 2037 15:23:05 GMT-0600 (Central Standard Time)
// // // autocorrected to next day, bc Nov doesnt have 31 days

// // // pass into the date constructor function
// // // amount of milliseconds passed since the beginning of
// // // the unix time, Jan 1st, 1970

// // console.log(new Date(0));
// // console.log(new Date(3 * 24 * 60 * 60 * 1000)); // days to milliseconds

// // Working with dates

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future); // Thu Nov 19 2037 15:23:00 GMT-0600 (Central Standard Time)
// console.log(future.getFullYear()); // 2037
// console.log(future.getMonth()); // 10, zero based --> add 1 = 11
// console.log(future.getDate()); // 19, day of month
// console.log(future.getDay()); // 4, day of week
// console.log(future.getHours()); // 15
// console.log(future.getMinutes()); // 23
// console.log(future.getSeconds()); // 0
// console.log(future.toISOString()); // 2037-11-19T21:23:00.000Z
// console.log(future.getTime()); // 2142278580000, number of milliseconds passed since Jan 1st 1970 based on future date

// console.log(new Date(2142278580000)); // Thu Nov 19 2037 15:23:00 GMT-0600 (Central Standard Time)
// console.log(Date.now()); // 1624982814589

// future.setFullYear(2040); // sets year in the future date variable from 2037 to 2040
// console.log(future); // logs future date with new year

// LECTURE: Adding Dates to Bankist App

// added

// // LECTURE: Operations with Dates

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(Number(future)); // 2142278580000

// // function that returns number of days passed between
// // two dates

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));

// console.log(days1); // 10

// // display text based on whether something happened today
// // 1 day ago, 10 days ago.ect 1 week ago.
// // see functions in the app code. added, works as intended

// LECTURE: Internationalizing Dates (INTL)
// added dates using locales of users/properties of accounts

// // LECTURE: Internationalizing Dates (INTL)
// const num = 832342034.45;

// const options = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR', // currency must be defined like so
//   // useGrouping: false,
// };

// console.log('US:', new Intl.NumberFormat('en-US', options).format(num)); // US: 832,342,034.45
// console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num)); // Germany: 832.342.034,45
// console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(num)); // Syria: ٨٣٢٬٣٤٢٬٠٣٤٫٤٥
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num) // en-US 832,342,034.45
// ); // Syria: ٨٣٢٬٣٤٢٬٠٣٤٫٤٥

// // LECTURE: Timers: setTimeout and setInterval

// // setTimeout -> runs just once after defined time
// // setInterval runs forever until we stop it

// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   ...ingredients
// );
// // arguments passed after delay, will be arguments to the function

// console.log('Waiting...');

// // we can cancel timeout if we want, too
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// // JS code execution does not stop at the setTimeout -- it keeps
// // going thru code and the function eventually executes.

// // this is called asynchronous execution

// // time param in function is number of seconds in milliseconds
// // 1000 milliseconds = 1 second

// // setInterval

// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
