'use strict';
////////////////////////
// CODING CHALLENGE 1 //
////////////////////////

/*

We're building a football betting app (soccer for my American friends �)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and
'players2')
2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored
GOOD LUCK :)
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// // 1.)

// const players1 = game.players[0];
// const players2 = game.players[1];

// // with what was taught in lecture:
// // const [players1, players2] = game.players

// console.log(players1);
// console.log(players2);

// // 2.)

// // for team 1
// const [gk, ...fieldPlayers1] = players1;
// console.log(gk, fieldPlayers1);

// // for team 2 (necessary? not necessary?)

// // 3.)

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.)

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5.)

// let team1 = game.odds.team1;
// let draw = game.odds.x;
// let team2 = game.odds.team2;
// console.log(team1, draw, team2);

// // with what was taught in lecture:
// // const { odds: {team1, x: draw, team2},} = game
// // console.log(team1, draw, team2);

// // 6.)

// function printGoals(...goals) {
//   console.log(
//     `Goals scored by: ${goals} | Number of goals scored: ${goals.length}`
//   );
// }

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// printGoals(...game.scored); // only way it will output 4? else 1

// // 7.)

// console.log(team1 < team2, 'team1 likely to win' || team2 < team1 || draw);

// // answer from video
// team1 < team2 && console.log('Team 1 is more likely to win!');

// ////////////////////////
// // CODING CHALLENGE 2 //
// ////////////////////////

// // Let's continue with our football betting app! Keep using the 'game' variable from
// // before.
// // Your tasks:
// // 1. Loop over the game.scored array and print each player name to the console,
// // along with the goal number (Example: "Goal 1: Lewandowski")
// // 2. Use a loop to calculate the average odd and log it to the console (We already
// // studied how to calculate averages, you can go check if you don't remember)
// // 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// //      Odd of victory Bayern Munich: 1.33
// //      Odd of draw: 3.25
// //      Odd of victory Borrussia Dortmund: 6.5
// // Get the team names directly from the game object, don't hardcode them
// // (except for "draw"). Hint: Note how the odds and the game objects have the
// // same property names �
// // 4. Bonus: Create an object called 'scorers' which contains the names of the
// // players who scored as properties, and the number of goals as the value. In this
// // game, it will look like this:
// //      {
// //          Gnarby: 1,
// //          Hummels: 1,
// //          Lewandowski: 2
// //      }
// // GOOD LUCK �

// // 1.)

// const goalsList = Object.entries(game.scored);

// for (let [goalNumber, scoringPlayer] of goalsList) {
//   console.log(`Goal ${Number(goalNumber) + 1}: ${scoringPlayer}`);
// }

// // returned the index in game.scored array, had to add one
// // to make sense, there can't be a 0th goal.

// // 2.)

// // grab values from object odds in game object
// // makes them into an iterable array, as objects not iterable
// const gameOdds = Object.values(game.odds);

// // confirm they are in an array
// console.log(gameOdds);

// // create avgOdds variable
// let avgOdds = 0;

// // calculate average game odds
// for (let i = 0; i < gameOdds.length; i++) {
//   avgOdds += gameOdds[i] / gameOdds.length;
// }

// // log average game odds
// console.log(avgOdds);

// // average odd = sum of all divided by number of odds
// // number of odds = game.odds.length?

// // 3.)

// // grab the contents of odds object in game
// const entriesOdds = Object.entries(game.odds);

// // log to make sure array
// console.log(entriesOdds);

// // log to console odds with dynamic team and possible result
// for (let [teamName, odd] of entriesOdds) {
//   const teamStr = teamName === 'x' ? 'draw' : `victory ${game[teamName]}`;

//   console.log(`Odds of ${teamStr}: ${odd}`);
// }

// // check if team exists, if not, default to draw.
// // `Odd of victory`
// // print each result in a separate line
// // do not hard code team names, get them from game object
// // game object has team1 and team2 same names in game obj
// // as well as the odds object, too. x is the draw.
// // grab the odds from the game.odds object too

// // 4.)

// let scorers = {};

// for (let x of game.scored) {
//   // checks is there is a property that already exists
//   // if so, add one to the value, else create it
//   scorers[x]++ || (scorers[x] = 1);

//   // works good for keeping scores
// }

// console.log(scorers);

// // ////////////////////////
// // // CODING CHALLENGE 3 //
// // ////////////////////////

// // Let's continue with our football betting app! This time, we have a map called
// // 'gameEvents' (see below) with a log of the events that happened during the
// // game. The values are the events themselves, and the keys are the minutes in which
// // each event happened (a football game has 90 minutes plus some extra time).
// // Your tasks:
// // 1. Create an array 'events' of the different game events that happened (no
// // duplicates)
// // 2. After the game has finished, is was found that the yellow card from minute 64
// // was unfair. So remove this event from the game events log.
// // 3. Compute and log the following string to the console: "An event happened, on
// // average, every 9 minutes" (keep in mind that a game has 90 minutes)
// // 4. Loop over 'gameEvents' and log each element to the console, marking
// // whether it's in the first half or second half (after 45 min) of the game, like this:
// // [FIRST HALF] 17: ⚽ GOAL
// // GOOD LUCK �
// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '� Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '� Substitution'],
//   [64, '� Yellow card'],
//   [69, '� Red card'],
//   [70, '� Substitution'],
//   [72, '� Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '� Yellow card'],
// ]);

// // 1.)

// const events = [...new Set(gameEvents.values())];

// console.log(events);

// // 2.)

// console.log(gameEvents);
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3.)

// // time in a game = 90 min
// // need number of events, or gameEvents.size

// let gameDuration = 90;

// // divide number of minutes in game by how many events happened
// let averageTimeBetweenEvents = gameDuration / gameEvents.size;

// console.log(
//   `An event happened, on average, every ${averageTimeBetweenEvents} minutes`
// );

// // technically, there were 92 minutes played in game, so

// // could hard code 92, could also grab the last key of the
// // last element in gameEvents as that would have the number of minutes played

// // i got this from SO :) \/
// gameDuration = [...gameEvents][gameEvents.size - 1][0];
// // not sure how it works but it does. i know it spreads
// // the gameEvents to an array

// console.log(gameDuration); // 92

// averageTimeBetweenEvents = gameDuration / gameEvents.size;

// // here is the "true" average of one event every 9.2 minutes

// console.log(
//   `An event happened, on average, every ${averageTimeBetweenEvents} minutes`
// );

// // 4.)

// for (const [key, value] of gameEvents) {
//   let whichHalfString = key <= 45 ? '[FIRST HALF]' : '[SECOND HALF]';
//   console.log(`${whichHalfString} ${key}: ${value}`);
// }

// // // ////////////////////////
// // // // CODING CHALLENGE 4 //
// // // ////////////////////////

// // Write a program that receives a list of variable names written in underscore_case
// // and convert them to camelCase.
// // The input will come from a textarea inserted into the DOM (see code below to
// // insert the elements), and conversion will happen when the button is pressed.
// // Test data (pasted to textarea, including spaces):
// // underscore_case
// // first_name
// // Some_Variable
// //  calculate_AGE
// // delayed_departure
// // Should produce this output (5 separate console.log outputs):
// // underscoreCase ✅
// // firstName ✅✅
// // someVariable ✅✅✅
// // calculateAge ✅✅✅✅
// // delayedDeparture ✅✅✅✅✅
// // Hints:
// // § Remember which character defines a new line in the textarea �
// // § The solution only needs to work for a variable made out of 2 words, like a_b
// // § Start without worrying about the ✅. Tackle that only after you have the variable
// // name conversion working �
// // § This challenge is difficult on purpose, so start watching the solution in case
// // you're stuck. Then pause and continue!
// // Afterwards, test with your own test data!

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// // add event listener to button, listen for a click
// // on button click, execute function that receives
// // list of variable names written in underscore_case
// // and converts them to camelCase

// // console.log all 5 variables on their own console.log line

// // grabbing elements from DOM
// const textArea = document.querySelector('textArea');
// const convertButton = document.querySelector('button');

// // making sure they are selected
// console.log(textArea);
// console.log(convertButton);

// // create new array for camel variables
// let camelVars = [];

// // adding event listeners to elements
// // need event listener for textarea? unsure
// convertButton.addEventListener('click', function () {
//   console.log('button works'); // testing that button works

//   console.log(textArea.value); // testing that textarea input works

//   // create new array containing underscore case variables
//   let underscoreVars = textArea.value.split('\n');

//   console.log(underscoreVars); // checks for input

//   for (let i = 0; i < underscoreVars.length; i++) {
//     // convert all strings to lowercase first
//     // trim strings, get rid of erroneous spaces
//     camelVars[i] = underscoreVars[i].toLowerCase().trim();

//     // split input variable into two halves
//     let [firstHalf, secondHalf] = camelVars[i].split('_');
//     // console.log(firstHalf, secondHalf);

//     // set first letter of second half of variable to its
//     // own variable
//     let secondHalfFirstLetter = secondHalf[0].toUpperCase();

//     // join together first half, second half first letter, and
//     // second half of variable beginning at position 1, excluding
//     // the first letter
//     camelVars[i] = [
//       `${firstHalf}${secondHalfFirstLetter}${secondHalf.slice(1)}`,
//     ].join();

//     // let underscoreIndex = camelVars[i].indexOf('_');
//     // camelVars[i] = camelVars[i][underscoreIndex + 1].toUpperCase();
//     // check new array
//     console.log(camelVars);

//     // log each item in array, with repeating check in same
//     // position, after padding, after length of variable
//     console.log(camelVars[i].padEnd(17, ' '), '✅'.repeat(i + 1));
//   }

//   // things to do to each _ variable:
//   // 2.) lowercase all strings /done
//   // 1.) remove erroneous spaces
//   // .) split the two parts of variable into each separate variable
//   // 4.) camel case the first letter AFTER underscore, use indexOf('_' + 1) to find it
//   // 3.) remove '_' from strings, after using it as
//   // reference point

//   // each variable on each different line has \n at the end
//   // we will have to remove that later.
//   // also need to separate variable from each other, so we
//   // could probably use \n as the item to separate it, and
//   // remove it after they are all their own element in the
//   // array
//   // use the _ as a reference point to capitalize the letter
//   // right after it, then we can remove it
// });

// // test inputs

// /*
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure
// */

// // on button click, take textContents

// // create function to change textarea inputs

// // take all input and transform to lowercase
