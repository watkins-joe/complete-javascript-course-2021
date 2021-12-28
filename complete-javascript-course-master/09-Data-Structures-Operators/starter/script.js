'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // PRE-ES6 way of adding object to another object as a property
  // openingHours = openingHours,

  // ES6 -> onward way of adding object to another object as a property
  openingHours,

  // PRE-ES6 way of writing a method in an object
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // ES6 -> onward way or writing a method in an object
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = 20,
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// // ///////////////////////////////////////////
// // // LECTURE: String Methods Practice

const flights = `_Delayed_Departure;fao93766109;txl2133758440;11:25
  +_Arrival;bru0943384722;fao93766109;11:45
  +_Delayed_Arrival;hel7439299980;fao93766109;12:05
  +_Departure;fao93766109;lis2323639855;12:30`;

let flightsList = flights.split('+');
console.log(flightsList);

for (let i = 0; i < flightsList.length; i++) {
  let [status, depAirport, arrAirport, time] = flightsList[i].split(';');

  status = status.slice(1, status.length).replace('_', ' ');
  depAirport = depAirport.slice(0, 3).toUpperCase();
  arrAirport = arrAirport.slice(0, 3).toUpperCase();
  time = time.replace(':', 'h');

  let str = `${
    status.includes('Delayed') ? '🔴' : '🟢'
  } ${status} from ${depAirport} to ${arrAirport} (${time})`;

  str = str.padStart(45, ' ');

  console.log(str);
}

// 1.) split each event into its own item in an array
// .) messages are already in correct case
// .) uppercase airport names
// .) remove erroneous numbers after airport names
// .) make stuff into an object with keys and values?
// .) for arrival airport and departure airport

// turn this information into human readable-stuff

// Delayed Departure from FAO to TXL (11h25)
//           Arrival from BRU to FAO (11h45)
//   Delayed Arrival from HEL to FAO (12h05)
//         Departure from FAO to TXL (12h30)

// // ///////////////////////////////////////////
// // // LECTURE: Working with Strings - Part 3

// // split(); a string into multiple parts based on a divider
// // string

// console.log('a+very+nice+string'.split('+')); // logs ["a", "very", "nice", "string"]
// // logs the same string but split by the divider passed
// // into the argument, as an array

// console.log('Jonas Schmedtmann'.split(' ')); // logs ['Jonas', 'Schmedtmann']
// // can then use the power of destructuring to create variables
// // this way from strings, from using split to create an array

// const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
// console.log(firstName, lastName);

// // join(); method, opposite of split, argument is what
// // to have as divider

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName); // logs Mr. Jonas SCHMEDTMANN
// // you get one entire string as a result :)

// const capitalizeFirstLetterOfNames = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const n of names) {
//     // join it with the rest of the word, starting from pos 1,
//     // or everything except the first letter, which is n[0]
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     // OR we can do something different, achieve same result
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper);
//   console.log(namesUpper.join(' '));
// };

// const passenger = 'jessica ann smith davis';

// capitalizeFirstLetterOfNames(passenger);
// capitalizeFirstLetterOfNames('joe watkins');

// // padding a string = adding a certain number of characters
// // to a string until the string has a certain desired length

// const message = 'Go to gate 23!';

// // padStart();, add characters to beginning of string until
// // string reaches x length.
// // first arg is the final length after padding,
// // second arg is the character we want to pad the string w/
// console.log(message.padStart(25, '+'));
// console.log('Jonas'.padStart(25, '+'));

// // padEnd();, add characters to end of string until
// // string reaches x length.
// // first arg is the final length after padding,
// // second arg is the character we want to pad the string w/

// console.log(message.padEnd(25, '+'));
// console.log('Jonas'.padEnd(25, '+'));

// console.log('Jonas'.padStart(25, '+').padEnd(35, '+'));
// console.log('Jonas'.padStart(25, '+').padEnd(30, '+'));

// // real world example of padding

// // credit car number masking, typically you only see the
// // last 4, so lets implement the masking

// const maskCreditCard = function (number) {
//   // const str = number + '' // converts to string
//   const str = String(number);
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };

// console.log(maskCreditCard(123124712361872));
// console.log(maskCreditCard(12341234));
// console.log(maskCreditCard('12398234912374268'));

// // repeat(); allows us to repeat the same string multiple times
// // argument is how many times you want it to repeat
// const message2 = 'Bad weather... all departures delayed... ';

// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'->'.repeat(n)}`);
// };

// planesInLine(5);
// planesInLine(3);
// planesInLine(12);

// ///////////////////////////////////////////
// // LECTURE: Working with Strings - Part 2

// // changing the case of a string

// const airline = 'TAP Air Portugal';

// console.log(airline.toLowerCase()); // tap air portugal
// console.log(airline.toUpperCase()); // TAP AIR PORTUGAL
// // can also use directly on a string
// console.log('joe'.toUpperCase()); // JOE

// // more practical example --
// // Fix capitalization in a passenger name

// const passenger = 'jOnAS'; // should look like Jonas

// const passengerLower = passenger.toLowerCase(); // jonas

// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);

// console.log(passengerCorrect); // Jonas

// // Comparing user emails

// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@Jonas.Io \n';

// // convert to lower
// // const lowerEmail = loginEmail.toLowerCase();

// // removes leading and trailing white spaces, or erroneous spaces in string
// // const trimmedEmail = lowerEmail.trim();
// // console.log(trimmedEmail);

// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);

// console.log(normalizedEmail === email); // true

// // Replace parts of strings

// const priceGB = '288,97£';

// // replace comma with period, pound symbol with USD symbol

// // first argument is item to replace, second is to what to replace
// // the first argument with
// const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceUS);

// // can also replace entire words, not just characters
// // replace() method arguments are CASE SENSITIVE

// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';

// console.log(announcement.replace('door', 'gate'));
// // only replaced the first occurence of 'door' in string

// // you can now use replaceAll to replace all instances of
// // the string with another

// console.log(announcement.replaceAll('door', 'gate'));
// // logs correct announcement, with all 'door' instances replaced

// // can create a 'regular expression' to replace all, just not
// // the first one

// // add string between slashes / / with a g appended after
// // second slash, which stands for global.

// console.log(announcement.replace(/door/g, 'gate'));

// // Booleans

// // includes();

// const plane = 'Airbus A320neo';

// console.log(plane.includes('A320')); // true
// console.log(plane.includes('Boeing')); // false

// // startsWith();

// console.log(plane.startsWith('Air')); // true
// console.log(plane.startsWith('A')); // true
// console.log(plane.startsWith('Ai')); // true

// // endsWith();
// // check if current plane is part of new airbus family

// if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('Part of the new Airbus family');
// } else {
//   console.log('Not part of the new Airbus family');
// }

// // Practice Exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   console.log(
//     baggage.includes('knife') || baggage.includes('gun')
//       ? 'your baggage is not allowed'
//       : 'your baggage is ok'
//   );
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// ///////////////////////////////////////////
// // LECTURE: Working with Strings - Part 1

// // strings have indexes like arrays, and you can grab
// // any one you want.

// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(plane[0]); // A
// console.log(plane[1]); // '3'
// console.log(plane[2]); // '2'

// console.log('B737'[0]); // B

// console.log(airline.length); // 16
// console.log('B737'.length); // 4

// // strings also have methods

// // can get the position of a letter in a string using
// // indexOf method, like we did in arrays

// // indexOf gives FIRST occurence of letter in string

// console.log(airline.indexOf('r')); // 6, spaces between words or letters counts as one space

// // lastIndexOf gives LAST occurence of letter in string

// console.log(airline.lastIndexOf('r')); // 10

// // can also search for entire words
// // outputs on what index the word begins
// // is CASE SENSITIVE

// console.log(airline.indexOf('Portugal')); // 8

// // one good use case of these indexes is to extract part
// // of a string using the slice() method.

// console.log(airline.slice(4)); // Air Portugal, called a sub-string b/c it's just a part of the original string

// // we can also specify an end parameter

// console.log(airline.slice(4, 7)); // Air
// // the end value, or second argument, IS NOT included in the sub-string
// // that is produced from slice().
// // in this example, slice stops extracting before reaching index number 7.

// // extract the first word of the string

// console.log(airline.slice(0, airline.indexOf(' ')));

// // extract the last word of the string
// console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal

// console.log(airline.slice(-2)); // al
// // inputting a negative beinning argument here makes slice
// // start counting from the end toward the beginning of the
// // string, so from right to left.
// console.log(airline.slice(1, -1)); // AP Air Portuga
// // started at POS 1, which is why T cut off, and ended at POS -1, which is why 'l' is cut off

// console.log(airline.slice(-2)); // al

// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats on plane
//   // 6 seats, ABC DEF, seats =  ABC, DEF
//   // take the last char of string and test if
//   // it is a B or E
//   if (seat.slice(-1) === 'B' || seat.slice(-1) === 'E') {
//     console.log(`You have a middle seat!`);
//   } else {
//     console.log(`You don't have a middle seat.`);
//   }
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');
// ///////////////////////////////////////////
// // LECTURE: Summary: Which Data Structure To Use?

// Data Structures Overview

// Three sources of data:
// 1.) From the program itself: Data written directly in
// source code (e.g. status messages)
// 2.) From the UI: Data input from the user or data written
// in DOM (e.g. tasks in todo app)
// 3.) From external sources: Data fetched for example from
// a web API (e.g. recipe objects)
// API = application programming interface

// We usually always have collections of data that we need
// to store somewhere

// and we use data structures to store these collections of data

// Questions to ask to figure out what type of data structure
// to use:

// 1.) Do we just need a simple list of values?
// If so, then we are going to use an ARRAY or a SET.
// In a simple list, we have the values without any description

// 2.) Do we need key/value pairs?
// If so, then we will need an OBJECT or a MAP.
// Because keys allow us to DESCRIBE values.

// WebAPIs
// Data from webAPIs usually comes in a special data format called JSON

// ARRAYS vs. SETS

// ARRAYS
// Use when you need ORDERED list of values (might contain duplicates)
// Use when you need to MANIPULATE data

// SETS
// Use when you need to work with UNIQUE vales
// Use when high-performance is really important
// Use to REMOVE DUPLICATES from arrays

// OBJECTS vs. MAPS

// OBJECTS
// More "traditional" key/value store
// and object have been considered "abused" because maps
// didn't exist before ES6.
// Biggest advantage of objects of how easy it is to write
// them and access data using . and []
// Easier to write and access values with . and [].

// Use when you need to include FUNCTIONS (methods)
// Use when working with JSON (can convert to Map)

// MAPS
// WAY better suited for key/value stores
// Better performance
// Keys can have ANY data type
// Easy to iterate
// Easy to compute size

// Use when you simply need to map key to values
// Use when you need keys that are NOT strings

// // ///////////////////////////////////////////
// // // LECTURE: Maps: Iterations

// // there is another way of populating a map without
// // using the set() method, as it can be very cumbersome
// // to use if there are a lot of values to set

// // manual way

// const question = new Map([
//   ['question', 'what is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct :D'],
//   [false, 'Try again!'],
// ]);

// // this is the same object structure that is returned when
// // you call Object.entires() where the first element is the key
// // and the second one is the value
// console.log(Object.entries(openingHours));

// console.log(question);

// // what this means, is that there is an easy way to convert
// // from objects to maps

// // Convert object to map ///////

// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap); // is now a map

// // Iteration is possible on maps b/c maps are iterable
// // can loop thru object, but have to use Object.entires(nameOfObject)
// // after 'of' in order for it to become iterable

// // we only want to print the answer choices from question map
// // therefore we only want to print if the key is a number

// // Quiz app

// console.log(question.get('question'));

// for (const [key, value] of question) {
//   if (typeof key === 'number') {
//     console.log(`Answer: ${key} ${value}`);
//   }
// }

// const answer = 3;
// // const answer = Number(prompt('Your answer:'));
// console.log(answer);

// // solution 1
// console.log(question.get(question.get('correct') === answer));

// // solution 2
// answer === 3
//   ? console.log(question.get(true))
//   : console.log(question.get(false));

// // sometimes, we need to convert a map back to an array

// // Convert map to array

// // you can do this by building a new array and then unpacking
// // again using the spread operator

// console.log([...question]); // same as question.entries
// console.log(question.entries());
// console.log(question.keys());
// console.log(question.values());

// // we get a weird map iterator in console, so we have to spread them
// // and put them into a new array.

// console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);
// // not too important

// // ///////////////////////////////////////////
// // // LECTURE: Maps: Fundamentals

// // second new data structure in ES6 are Maps
// // a Map is a data structure that we can use to 'map' values
// // to keys (AKA property names)

// // data is stored in key-value pairs in Maps just like in
// // objects. (property: value pairs)

// // the big difference between objects and maps is that
// // the keys can have any type, unlike in objects, where they
// // are basically always strings.

// // min maps, we can have any type of key. it could be objects,
// // arrays, or other maps.

// // easiest way of creating a map is to create an empty map
// // without passing anything in
// const rest = new Map();

// // to fill the Map, we use the set method.
// // first argument is the key name (or property name) and
// // the second argument is the value.
// rest.set('name', 'Classico Italiano');

// rest.set(1, 'Firenze, Italy');
// rest.set(2, 'Lisbon, Portugal');

// // the set method also returns the map it's called on
// // this allows us to chain the set method like so:

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// // we use the get method to retrieve data from a map
// // desired key to get the value of as the argument.
// console.log(rest.get('name')); // logs Classico Italiano
// console.log(rest.get(true)); // logs We are open :D

// // the data type of the key matters, if we tried 'true' as a string
// // it would log undefined

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// // can also check if a map contains a certain key

// console.log(rest.has('categories')); // true

// // can also delete elements from the map based on the key

// console.log(rest);
// rest.delete(2); // deletes '2' key with Lisbon, Portugal as value
// console.log(rest);

// // can also find the size of the map with size property

// console.log(rest.size); // 7 items

// // can also remove all elements from the map

// console.log(rest);
// rest.clear(); // deletes all items from rest map
// console.log(rest); // empty

// // can use arrays or objects as map keys

// rest.set([1, 2], 'Test');
// console.log(rest); // logs {Array(2) => "Test"}

// console.log(rest.get([1, 2])); // this would not work to get the Test value
// // the first [1,2] and the second [1,2] --> they are not the same object in the heap
// // in order to make this work, we would have to assign the
// // [1,2] to an arr variable and then use it to get the data \/

// let arrTest = [3, 4];
// rest.set(arrTest, 'Test');
// console.log(rest.get(arrTest)); // logs Test
// // this works because now these two arrTest refer to the
// // same place in memory

// rest.set(document.querySelector('h1'), 'Heading');
// // h1 of index.html becomes the key for 'Heading'

// // ///////////////////////////////////////////
// // // LECTURE: Sets

// // in ES6, two more data structures were introduced. Sets and Maps

// // all about Sets

// // a set is a collection of unique values, therefore
// // a set cannot have any duplicate values, which is helpful
// // in some situations. Set CAN hold mixed data types. Sets
// // are also iterables.

// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);

// console.log(ordersSet); // logs {"Pasta", "Pizza", "Risotto"}
// // only has a length of three, b/c only three unique values, and deletes
// // the rest of the duplicates

// console.log(new Set('Jonas')); // logs {"J", "o", "n", "a", "s"}
// // Set can also be empty

// // you can get the size of a set
// console.log(ordersSet.size); // 3

// // check if certain element is inside a set
// console.log(ordersSet.has('Pizza')); // true
// console.log(ordersSet.has('Bread')); // false

// // can add new elements to a set
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// console.log(ordersSet);

// // can delete elements
// ordersSet.delete('Risotto');
// console.log(ordersSet);

// // can delete all elements from set
// // ordersSet.clear();

// // retrieving values from a set
// // we cannot use the array method
// console.log(ordersSet[0]); // logs undefined
// // because there are no indexes. in fact, there is no
// // way to set data out of a set.

// // can use them in loops since they are iterable.
// for (const order of ordersSet) {
//   console.log(order);
// }

// // Example:

// // practical/big use case for sets:
// // to remove duplicate values of arrays.

// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// // which different positions are in our restaurant?
// let staffUnique = new Set(staff);
// console.log(staffUnique); // logs Set(3) {"Waiter", "Chef", "Manager"} as an object

// // can use spread operator on all iterables, therefore we can use
// // it with a set
// staffUnique = [...new Set(staff)];

// console.log(staffUnique); // logs (3) ["Waiter", "Chef", "Manager"] as an array b/c of spread operator

// // return the value of number of unique positions in set
// console.log(
//   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size // logs 3
// );

// // can also count how many different letters are in a string, as a string too is iterable
// console.log(new Set('josephwatkins').size); // 12 unique letters in my name

// // sets are not intended to replace arrays

// // ///////////////////////////////////////////
// // // LECTURE: Looping Objects: Object Keys, Values, and Entries

// // we can loop over objects, which are NOT iterables unlike arrays
// // we can do this in an indirect way

// // we have different options depending on what we want to loop over

// // we will still have to use the for-of loop to loop over the array

// // property names (AKA: keys)

// const properties = Object.keys(openingHours);
// console.log(properties);
// // properties is an array with the three property names
// // so Object.keys() creates an array
// // we can use this to computer how many properties are in the object

// let openStr = `We are open on ${properties.length} days: `;
// // We are open on 3 days

// for (const day of Object.keys(openingHours)) {
//   openStr += `${day}, `;
//   // logs thu, fri, sat each on their own separate line
//   // which are exactly the three key names of the object
// }
// console.log(openStr);
// // We are open on 3 days: thr, fri, sat

// // Property VALUES

// const values = Object.values(openingHours);
// console.log(values);

// // logs the time values for each of the days
// // [{...},{...},{...}]
// // there is no need to loop over them again because it will work
// // exactly the same as here

// // to simulate to loop over the entire object, we need the entires.
// // entries are bascially names plus the values together

// // Entire object
// const entries = Object.entries(openingHours);
// // console.log(entries);
// // all of the keys, values and entries transforms the object into an array

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }
// // key being day, open and close being values in the day object inside openingHours
// // the values are open and close.
// // the {} are needed because the value, too is also an object b/c it has open and close properties within it.
// // otherwise, with a simpler object with a simpler value, you would just use [key, value]
// // we can use destructuring to destructure the object and its properties, keys, and values
// // you could even rename key to 'day' or something else if you wanted

// // ///////////////////////////////////////////
// // // LECTURE: Optional Chaining

// // lets say we wanted to get opening hours of our restaruant
// // for monday

// // console.log(restaurant.openingHours.mon); // undefined

// // lets pretend that we do not know if this restaurant opens
// // on monday or not, and that could be the case if this data
// // came from a real webAPI and not all would open on monday

// // console.log(restaurant.openingHours.mon.open); // could not
// // read property 'open' of undefined

// // WITHOUT optional chaining

// // if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open); // no output
// // if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open); // 11

// // if (restaurant.openingHours && restaurant.openingHours.mon)
// // console.log(restaurant.openingHours.mon.open);
// // this can get very complicated and very complex very fast

// // therefore, ES2020 introduced optional chaining.
// // with optional chaining, IF a certain property does NOT exist
// // then undefined is returned IMMEDIATELY, so that will avoid
// // the error that we encountered on line 81

// // this is how it works

// // WITH optional chaining
// console.log(restaurant.openingHours.mon?.open); // undefined
// // optional chaining operator is '?', and the way it work is:
// // instead of just a dot, we use the question mark. so, ONLY
// // if the property BEFORE the question mark exists, then the
// // open property will be read from there, ELSE returns undefined
// // so --> only IF monday exists, will the open property be read
// // IF monday does NOT exist, undefined will be IMMEDIATELY returned
// // checks is a property is NOT null and NOT undefined. which means
// // if the property is ZERO OR an empty string '', then it technically
// // exists

// // we can also have multiple optional chainings
// console.log(restaurant.openingHours?.mon?.open); // undefined

// // now, if restaurant.openingHours does not even exist, then
// // the mon property will not even be read, and therefore,
// // we don't get that error. this makes it easy to avoid all
// // kinds of bugs that we might not expect.

// // real world example of optional chaining:

// const days = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   // in order to use a variable name as a property name,
//   // we have to use bracket notation.
//   console.log(`On ${day}, we open at ${open}`);
//   // logs the days and at what time on each day the restaurant opens dynamically

//   // we can set a default value if on a certain day the restaurant
//   // is not open at all instead of having 'undefined' display

//   // we had a problem using OR || to display closed if they aren't open,
//   // but if opening at hour 0, returns closed because 0 is a falsy value.
//   // to circumvent this, we use the nullish coalescing operator instead ??
// }

// // Methods

// // optional chaining also works for calling methods
// // we can check to see if a method exists before we actually call it

// // it is best practice to use the nullish coalescing operator together with optional chaining

// console.log(restaurant.order?.(0, 1) ?? 'method does not exist'); // method exists, logs ['Focaccia', 'Pasta']
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'method does not exist'); // method does not exist, logs 'method does not exist'

// // Arrays

// // optional chaining ALSO works for arrays

// // we can use it to check if an array is EMPTY

// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

// const usersList = [];

// console.log(users[0]?.name ?? 'user array empty'); // logs 'Jonas'
// // checks if there is an element in the users array at position 0
// // if there is, log the element's name property, else log 'user array empty'

// console.log(usersList[0]?.name ?? 'user array empty'); // logs 'user array empty'

// // without optional chaining, we would have to write something like this

// if (users.length > 0) console.log(users[0].name);
// else console.log('user array empty'); // logs Jonas

// ///////////////////////////////////////////
// // LECTURE: Enhanced Object Literals

// // restaurant is an object literal, because we basically wrote
// // this object literally in our code using the curly braces
// // syntax. all of the object has been written using the
// // object literal syntax

// // ES6 has introduced THREE ways to make it easier to write
// // object literals, like restaurant

// // before ES6, we would have to write openingHours in restaurant
// // and set it equal to the outside object openingHours. what
// // is annoying with that is that the property name is exactly
// // the same as the variable name from which we're getting the
// // new object.

// // 1.)
// // with enhanced object literals, all we have to do is write
// // the name of the object to include with a comma, and thats it
// // see above restaurant object for examples

// // PRE-ES6 way of adding object to another object as a property
// // ...
// // openingHours = openingHours,
// // ...

// // ES6 -> onward way of adding object to another object as a property
// // ...
// // openingHours,
// // ...

// // 2.)
// // in ES6, we no longer have to create a property and set it
// // to a function expression. we no longer need to do that.

// // for example, the order method can be replaced as follows:

// // PRE-ES6 way of writing methods on an object:

// // order: function (starterIndex, mainIndex) {
// //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
// // },

// // ES6 -> onward way

// // order(starterIndex, mainIndex) {
// //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
// // },
// // we delete the function keyword and remove the colon.

// // 3.)
// // in ES6, we can now actually compute property nmes instead
// // of having to write them out manually and literally.
// // for example, say we have an array with all of the weekdays

// const weekdays = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

// // and now we wanted to take those property names out of this
// // array instead of having to write them in an object manually
// // we can reference the array and index position in the object
// // we can put any expression in where the weekdays go, basically.

// // for example:
// const closingHours = {
//   [weekdays[0]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[1]]: {
//     open: 9,
//     close: 19,
//   },
//   //or even an expression
//   [`day-${2 + 4}`]: {
//     // but this doesnt make sense to do practically, just as an example
//     open: 12,
//     close: 22,
//     close2: 12 + 12, // can also compute property names here in ES6 -> onward
//   },
// };

// console.log(closingHours);

// ///////////////////////////////////////////
// // LECTURE: Looping Arrays: The for-of Loop (new in ES6)

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// // for-of loop, for looping thru arrays with out hassle of
// // writing all of the for conditions, like counter (let i =...ect)

// for (const item of menu) console.log(item);
// // logs all items in the array to the console individually
// // on separate lines because the item variable is the current
// // item in each iteration of the loop

// // also, just like the if-else statement, we don't have to
// // create a code block is we only have one statement to
// // execute

// // this for-of loop will automatically over the whole array
// // in each iteration, it will give us access to the current
// // array element, which we specify with 'item', or can call
// // it anything we want

// // we can also use the continue or break keywords with this
// // loop

// // what if we wanted also wanted the current index and not
// // just the current element? in the for-of loop, its a pain
// // when we need the index because the for-of loop was
// // really just meant to give you the current element. BUT,
// // you can get both the current index and current element

// for (const item of menu.entries()) {
//   console.log(item);
// }

// // /\ logs to console each element in array as well as the index
// // of each corresponding element in the array, too by using
// // the entries() method on the menu array

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }
// // /\ logs to console:
// // 1: Focaccia
// // 2: Bruschetta
// // 3: Garlic Bread
// // ...

// // can do above in a better way by destructuring it like below

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }
// // /\ logs to console same as a for-of loop on line 96, but
// // we instead destructured the array into two variables, i
// // for index and el for element

// // console.log(menu.entries()); // logs Array Iterator {}
// // console.log([...menu.entries()]); // as example
// // // creates a new array
// // // which in each position contains a new array which contains
// // // the element and the index of that element FROM the original
// // // array (menu)

// ///////////////////////////////////////////
// // LECTURE: The Nullish Coalescing Operator (??)

// restaurant.numGuests = 0;
// // when we set num guests = 0, JS will still take this
// // default value here and assign it to guests b/c 0 is a
// // falsy value, and because of that, we went to the second
// // operand, which is 10.
// const guests = restaurant.numGuests || 10;
// console.log(guests); // logs 10

// // there is a solution for this and it is the nullish
// // coalescing operator, introduced in ES2020

// // if numGuests is = to 0, it will return 0, else 10
// const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect); // logs 0
// // why does this work? it is because the nullish coalescing
// // operator works with the idea or with the concept of
// // nullish values instead of falsy values -- and nullish
// // values are null and undefined (NOT 0 or "")

// // it works as if the 0 and the empty string were NOT falsy
// // values, and were instead truthy values as well.

// // the ?? would ONLY short circuit if the first operand was
// // null or undefined, then the second operand would be
// // executed and returned. it returns the first non-nullish
// // operand

// ///////////////////////////////////////////
// // LECTURE: Short Circuitng (&& and ||)

// // Three properties of logical operators
// // 1) They can USE ANY data type
// // 2) They can RETURN ANY data type
// // 3) They can short circuit, short-circuiting

// // console.log('---- OR ----');
// // // example of short circuiting with || OR
// // // if the first value is a truthy value, it will immediately
// // // return that first value.

// // console.log(3 || 'Jonas'); // logs 3

// // // if the first operand (3) is truthy, the other operand
// // // will not even be evaluated ('Jonas')

// // console.log('' || 'Jonas'); // logs Jonas, because empty string is falsy value
// // console.log(true || 0); // logs true
// // console.log(undefined || null); // logs null, even though null is a falsy value and undefined is a falsy value
// // console.log(undefined || 0 || '' || 'Hello' || 23 || null); // logs Hello, because it is the first truthy value, and short circuits the evaluation

// // // practical application of this

// // restaurant.numGuests = 23;
// // // restaurant.numGuests = 0; // 0 is a falsy value
// // // checks if property numGuests exists on restaurant object, else default value is 10
// // const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// // console.log(guests1);

// // // checks if property numGuests exists on restaurant object, else default value is 10
// // // but with OR operator, way easier method of setting default values
// // // instead of using ternary operator or worse, an if-else statement
// // const guests2 = restaurant.numGuests || 10;
// // console.log(guests2);

// // // however, both of these short-circuit solutions will NOT
// // // work if the numGuests = 0 bc 0 is a falsy value

// // console.log('---- AND ----');

// // // example of short circuiting with && AND

// // // works in the exact opposite way of the OR || operator

// // console.log(0 && 'Jonas'); // logs 0
// // // this means that the && AND operator short-circuits on the
// // // first value that is FALSY, which in this case is 0, and
// // // then immediately returns the first falsy value without
// // // evaluting the second or any further operands

// // console.log(7 && 'Jonas'); // logs Jonas
// // // when entirely truthy, the evaluation continues and the LAST
// // // truthy value is returned
// // // the AND && operator is only true if all operands are true

// // console.log('Hello' && 23 && null && 'Jonas'); // logs null
// // // hello is truthy, 23 is truthy, null is falsy, eval stopped,
// // // as a result, null is returned. short-circuits the rest
// // // of the operation.

// // // practical example
// // if (restaurant.orderPizza) {
// //   restaurant.orderPizza('mushrooms', 'spinach');
// // }
// // // instead of writing an if-else statement, we can use the
// // // && operator to check if something exists and avoid writing
// // // an if-else statement.

// // restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
// // // checks if orderPizza method exists on restaurantObject and
// // // if it does, call the function with the arguments inside

///////////////////////////////////////////
// LECTURE: Rest Pattern and Parameters

// rest pattern looks exactly like spread operator (...), but does the opposite of spread operator

// remember, we use the spread operator to
// build new arrays OR
// pass multiple values into a function.

// and in both cases, we use the spread operator to expand an array into individual elements

// the rest pattern uses the exact same syntax to collect multiple elements and condense them into an array

// spread unpacks the elements from an array, rest packs elements into an array

// // 1) DESTRUCTURING

// // SPREAD, because on RIGHT side of the assignment operator (=)
// const arr = [1, 2, ...[3, 4]];

// // REST, because on LEFT side of the assignment operator (=)
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others); // logs [1 2, [3, 4, 5]]
// // the first and second elements become a and b respectively
// // then, the rest patterns takes the rest of the elements and puts them into a new array, which we called others.

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood); // logs Pizza Risotto ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]
// the rest pattern collects of the array AFTER the LAST variable, which in this case is 'risotto'
// it does NOT include any skipped elements, which makes sense that it is the rest pattern, because it takes the rest of them
// minus the skipped elements
// for this reason, the rest pattern always must be the last in the destructuring assignment.
// there can also ever be one rest pattern in any destructuring assignment

// Rest Pattern in Objects
// the difference between using the rest pattern in an object vs. an array is that
// the remaining, or rest, of the items in the object will be placed into a new
// object instead of an array.

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays); // logs {open: 0, close 24} {thu: ..., fri: ...}

// 2) FUNCTIONS

// remember that also for the spread operator, the second use case
// was to pass multuple arguments into a function all at the same time

// the rest pattern operator can do the opposite

// below, we use rest pattern parameters in a function to add up as many numbers as there are arguments
// without having to specify the number of parameters

// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum = numbers[i] + sum;
//   }
//   console.log(sum);
// };

// add(2, 3); // 5
// add(5, 3, 7, 2); // 17
// add(8, 3, 4, 2, 1, 2, 3, 4, 2, 1); // 30
// // takes all of these values and packs them into arrays for each function call

// // can use the spread operator to unpack to numbers, then function packs into array, and calculates them
// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// // logs mushrooms
// // logs ['onion','olives','spinach']

// restaurant.orderPizza('mushrooms');
// // logs mushrooms
// // logs []

///////////////////////////////////////////
// LECTURE: The Spread Operator (...)
// // the spread operator expands an array into all its elements. so, we basically unpack all the array elements at once

// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// // since es6, we can use the spread operator instead of doing manually
// const newArr = [1, 2, ...arr];
// // spread operator takes all of the values out of arr, and writes them individually as if we wrote them manually
// console.log(newArr);

// // we can use the spread operator whenever we would otherwise write multiple values separated by commas
// console.log(...newArr); // output 1 2 7 8 9

// // useful for adding things to existing arrays
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu); // displays original restaurant main menu with Gnocci added on to it, and we created the new array 'newMenu'

// // similar to destructuring that it takes all of the values out, but we cannot assign them to variables
// // so again, as a consequence, we can only use it in places where we would otherwise write values separated by commas

// // two important use cases of the spread operator
// // 1.) create shallow copies of arrays

// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// // 2.) merge two or more arrays together

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu); // logs the contents of both mainMenu and starterMenu in another new array called menu, that has all of the items in it from both menus from the restaurant object

// // spread operator works on all so-called 'iterables'

// // iterables are: arrays, strings, maps, sets, but NOT objects.

// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters); // logs ["J", "o", "n", "a", "s", " ", "S."]

// console.log(...str); // logs J o n a s

// // what we can't do is use this to build  string using a template literal

// // console.log(`${...str} Schmedtmann`) // unexpected token '...'
// // does not work because the ${ } space is not a space where it expects multiple values separated by a comma. It expects only one value

// // Real World Example

// // we can write a function that accepts multiple arguments and then use the spread operator
// // to actually pass those arguments into the function :)

// // const ingredients = [
// //   prompt(`Let's make pasta! What's your first ingredient`),
// //   prompt(`Let's make pasta! What's your second ingredient`),
// //   prompt(`Let's make pasta! What's your third ingredient`),
// // ];

// // console.log(ingredients);

// // restaurant.orderPasta(...ingredients);
// // outputs the three elements we input in the prompts in the string in the method

// // Objects

// // since ES2018, the spread operator also works on objects, even though objects are not iterables

// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };

// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name); // Ristorante Roma
// console.log(restaurant.name); // Classico Italiano

/////////////////////////////////////////
// Lecture: DESTRUCTURING OBJECTS

// // to destructure objects, we use the curly braces {}
// // then, all we have to do is provide the variable names that exactly match the property names
// // that we want to retrieve from the object

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories); // returns the name, hours, and categories
// // no spaces are required between properties, as the order of properties in an object does not matter, unlike those in an array
// // that have set positions.

// // what if we wanted the variable names to be different from property names?
// // propertyName: newVariableName,

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags); // returns the name, hours, and categories

// // can also set default values like in arrays

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters); // returns default value of [] for menu, and the starterMenu contents for 'starters'

// // mutating variables while destructuring objects

// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 17 };

// ({ a, b } = obj); // be sure to wrap in parenthesis to mutate these variables
// console.log(a, b);

// // nested objects

// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c); // 11 23 as output

// // destructuring objects inside of a function right away.

// //the properties in the index dont have to match the order in which we do the destructuring in the function up in the restaurant object.
// restaurant.orderDelivery({
//   time: '23:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });
// //outputs 'Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 23:30.'

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 2,
//   mainIndex: 2,
// });
// // outputs 'Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 20.'
// // time in this function defaults to its default value, specified in the restaurant method orederDelivery where it is = to 20

/////////////////////////////////////////
// Lecture: DESTRUCTURING ARRAYS

// array destructuring === unpacking values from an array or object into separate variables
// break complex data down into a smaller structure like a variable

// // w/o destructuring
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// console.log(a, b, c); // 2 3 4

// // w/ destructuring, we can declare all three variables at the same time
// const [x, y, z] = arr;
// // brackets with variables to set = nameOfArray

// // original array remains intact
// console.log(arr);

// console.log(x, y, z); // 2 3 4

// const [first, second] = restaurant.categories;
// //takes first and second, in order of the elements from which they appear in the array
// console.log(first, second); // italian, pizzeria

// // first and third in array, skip the second category in the categories array
// // leave a space with a comma to skip it. we dont have to create variables for things we dont need
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary); // italian vegetarian

// // for example, owner of restaruant wants to switch the main and secondary category which are italian and vegetarian now
// // // without destructuring and switching variables
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary); // vegetarian, italian
// // first, create an array with both of them
// [main, secondary] = [secondary, main];

// console.log(main, secondary); // vegetarian, italian

// // order menu from restaurant, returns array, we assign them to starter and mainCourse
// console.log(restaurant.order(2, 0)); // garlic bread, pizza

// const [starter, mainCourse] = restaurant.order(2, 0);

// console.log(starter, mainCourse); // Garlic Bread, Pizza

// // nested destructuring
// const nested = [2, 4, [5, 6]];

// // const [i, , j] = nested;
// // console.log(i, j); // 2, [5, 6]
// // what if we actually wanted the individual values?
// // we would have to do destructuring inside of destructuring

// const [i, , [j, k]] = nested; // skipping 4 again
// console.log(i, j, k); // 2 5 6

// // can set default values for variables when we are extracting them
// // [8, 9] pretend we dont know how many are in this array
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r); // 8 9 1
// // setting p, q, and r = 1 sets their default value = to 1 IF there is no data in the array at their position
// // otherwise, it takes the value of that position.
// // thats why r = 1, and if 9 was removed from array, then q would = 1, too.
