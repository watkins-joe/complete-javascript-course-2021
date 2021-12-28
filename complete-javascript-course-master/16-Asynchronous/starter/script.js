'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className) {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} ${'million'}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// Section intro:

// AJAX calls, grabbing data from remote servers in the background

// LECTURE: Asynchronous JavaScript, AJAX, and APIs

// What is synchronous code?

// Most code we've written is synchronous code, meaning it is executed line by line in the exact order of execution.

// each line of code waits for the previous to finish executing

// for example, the alert window is a long-running operation that blocks code execution until the OK button is pressed.

// ASYNCHRONOUS CODE

// example is a timer with a callback

// const p = document.querySelector('.p');
// setTimeout(function() {
//     p.textContent = 'My name is Jonas!'
// }, 5000);
// p.getElementsByClassName.color = 'red';

// Asynchronous code is executed AFTER A TASK THAT RUNS IN THE "BACKGROUND" FINISHES;

// Asynchronous code is non-blocking;

// Execution doesn't wait for an asynchronous task to finish its work.

// the callback function of setTimeout was deferred into the future with the 5 seconds

// Asynchronous = NOT OCCURRING AT THE SAME TIME

// ***** Callback functions alone do NOT MAKE CODE ASYNCHRONOUS! ***** //

// Setting the source attribute of any image is asynchronous, it loads the image source in the background. We can listen for a load event on when the image is loaded. In the example, the CB function will run after the image loads.

// **** ALSO -- addEventListener does NOT automatically make code asynchronous **** //

// What are AJAX calls?

// Asynchronous JavaScript And XML: Allows us to communicate with remote web servers in an ASYNCHRONOUS WAY. With AJAX calls, we can REQUEST DATA from web servers dynamically.

// We can use these to request data from a server dynamically, without reloading the web page.

// How does AJAX work?

// The client (i.e. browser) can REQUEST data from a web server (usually a web API) and the web server can send a RESPONSE back to the browser, and send the requested data back and/or any associated errors.

// The browser can also send POST requests or GET requests to either send data to a server to get data from a server, respectively.

// What is an API?

// Application Programming Interface: Piece of software that can used by another piece of software, in order to allow APPLICATIONS TO TALK TO EACH OTHER.

// There are many types of APIs in web development:
// examples that we have used include: DOM API, Geolocation API, Own Class API (where we make some methods available in the public interface) and "Online" APIs

// "Online" API, also called Web API or just API: Application running on a server, that receives requests for data, and sends data back as response.

// We can build our own web APIs (requires back-end development, e.g. with node.js) OR use 3rd-party APIs.

// In our example travel application, we could use 3rd party APIs for things like:

// Weather data, data about countries, flights data, currency conversion data, APIS for sending email or SMS, Google Maps, millions of other APIs.

// API Data Formats

// Remember, the X in AJAX stands for XML. Used to be widely used to transmit data on the internet. Not so much anymore.

// Instead, MOST APIs use the JSON data format. JSON = JavaScript Object Notation

// LECTURE: Our First AJAX Call: XMLHTTPREQUEST

// we will build a nice UI component that contains data about a certain country, this will come from a third party API.

// old school way with XMLHTTPREQUEST function

// step 1, using this for AJAX calls. (old school way)
const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  // step 2, params arenow we need the URL thru which to make the request
  // https://restcountries.com/v3/name/{name}

  request.open(
    'GET',
    `https://restcountries.eu/rest/v2/name/${country}
`
  );

  // CORS, cross-origin resource sharing.
  // Find the URL in something called an API endpoint.

  // step 3, send the request
  request.send();

  // register a callback on the request object for the load event

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} ${'million'}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
</article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

// chaining requests, for data to load in a certain order, called "CALLBACK HELL"

// LECTURE: Welcome to Callback Hell

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();

//   // step 2, params arenow we need the URL thru which to make the request
//   // https://restcountries.com/v3/name/{name}

//   request.open(
//     'GET',
//     `https://restcountries.eu/rest/v2/name/${country}
//   `
//   );

//   // CORS, cross-origin resource sharing.
//   // Find the URL in something called an API endpoint.

//   // step 3, send the request
//   request.send();

//   // register a callback on the request object for the load event
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       //   console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// What is callback hell?
// When we have a lot of nested callbacks in order to execute asynchronous tasks in sequence.

// for example:
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//         setTimeout(() => {
//           console.log('5 seconds passed');
//           setTimeout(() => {
//             console.log('6 seconds passed');
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Callback hell is easy to identify by its triangular shape to the left of the code editor.

// the issue with callback hell is that it makes it very messy, hard to maintain, hard to understand, and hard to reason about. this means code will be hard to understand and difficult to reason about will have more bugs and is worse code.

// the rule is that code that is hard to understand is bad code.

// there is a way to escape callback hell by using PROMISES.

// LECTURE: Promises and the Fetch API

// lets replace the old code with promises

// OLD WAY -- with XMLHttpRequest();

// const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://restcountries.eu/rest/v2/name/${country}
// `
//   );
//   request.send();

// NEW WAY -- with fetch();

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');

// console.log(request);

// the fetch function returned a promise. as we logged it, we saw the promise in console. it says pending.

// what matters is that we have a promise stored in the request variable.

// What are promises?

// A Promise is...
// An object that is used as a placeholder for the future result of an asynchronous operation.
// A container for an acynchronously delivered value.
// A container for a future value.

// An example of a promise is an AJAX call.

// A lottery ticket is just like a promise, you receive a promise that you will receive a sum of money in the future if you guess the correct numbers.
// 1.) I buy the lottery ticket (promise) now
// 2.) Lottery draw happens asynchronously
// 3.) If correct outcome, I receive money, because it was promised.

// Using promises, we no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.

// Instead of nesting callbacks, we can CHAIN PROMISES for a sequence of asynchronous operations: ESCAPING CALLBACK HELL!

// Promises are an ES6 feature and are now widely used by everyone!

// The Promise Lifecycle

// 1.) Promise is pending (BEFORE the future value is available)
// 2.) During this time, the task is working in the background,
// 3.) Then, the promise is SETTLED and the async task has FINISHED! There are two types of SETTLED promises.
//  a.) There is a FULFILLED promise and a REJECTED promise.
//  b.) A FULFILLED promise was successful, the value is NOW AVAILABLE!
//  c.) A REJECTED promise means an ERROR happened.
//  e.) A promise is also ONLY settled once and it is impossible to change that state.

// We will be able to HANDLE these different states in our code!

// We CONSUME a promise when we already have a promise.

// E.g Fetch API returns a promise, and the PROMISE is consumed when we already have a promise. E.g promise return from Fetch API.

// LECTURE: Consuming Promises

// we will consume the promise that was returned by the fetch function.

// const getCountryData2 = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}
//     `)
//     .then(function (response) {
//       console.log(response);

//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData2 = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}
//     `)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found. (${response.status})`);
//       // if response.ok is false

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//       // by returning this promise here, then the fulfilled value of the next 'then' method will be the fulfilled value of THIS promise.

//       // return this new promise

//       // then then method always returns a promise, no matter if we return anything or not.

//       // BUT, if we DO return a value, then that value will become the fulfillment value of the return promise.
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found. (${response.status})`);
//       // if response.ok is false

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Something went wrong! ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// after a certain time, the promise will be settled. either rejected or successful.

// lets assume it will be fulfilled.

// we use the 'then' method, with a function with the parameter of 'response'

// getCountryData2('portugal');

// in order to read the data from the body, we have to use the JSON method on the response

// the problem here is that the json() method is an async function, meaning it will also return a promise.

// what we need to do is return the promise from the json() method and add another then() at the end of the fetch function, with another function grabbing the data as a parameter.

// doing these steps, we got our data! :)

// RECAP:

// fetch function returns a promise
// we handle the first promise with the then method
// then to read the data from the response, we need to call the json method on that response object
// this itself will also return a promise, and so, if we then return that promise from the first "then" method, basically all of that becomes a new promise itself.
// since this is now a new promise, we can then again call the 'then' method on the new promise.
// and then agaon, we have a callback, but this time we get access to the data because the resolved value of this promise here is going to be the data itself, the data we are looking for.
// now, all we have to do is render the country of data[0]

// keep in mind, promises do NOT get rid of callbacks, but they do get rid of CALLBACK HELL!

// LECTURE: Chaining Promises

// GOAL: chain promises to render the neighboring country.

// we used promises to chain then() methods and responses.

// instead of cb hell, we have a flat chain of promises.

// promises are an incredibly powerful and elegant solution to handling asynchronous code.

// COMMON MISTAKE beginners make
// 1.) chaining the then() method to a new, nested promise, inside of the first then() method like so:

/*

    return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`).then(response => response.json())

*/

// this DOES work, but in doing so, we are returning to callback hell, because we have one CB function defined inside of another one. which is what we are tryin to avoid.

// ALWAYS return the promise and handle it outside and continuing the chain.

// LECTURE: Handling Rejected Promises

// remember that a promise with an error is a REJECTED promise.

// the only way the fetch promise rejects is when the user loses their internet connection.

// to simulate losing internet connection, go to network in chrome and go to OFFLINE. we want to simulate that the page loads but the user does the request w/o internet so we can see error happening.

// go into chrome, make sure 'Disable cache' is checked, and switch network to 'Offline'

// what we will do is assign the function getCountryData2(); to run on a button click so that we can simulate that.

// btn.addEventListener('click', function () {
//   getCountryData2('portugal');
// });

// after we click the button with offline mode checked, we get the following errors:

/*

script.js:316 GET https://restcountries.eu/rest/v2/name/portugal net::ERR_INTERNET_DISCONNECTED
getCountryData2 @ script.js:316
(anonymous) @ script.js:403

index.html:1 Uncaught (in promise) TypeError: Failed to fetch
Promise.then (async)
getCountryData2 @ script.js:338
(anonymous) @ script.js:403

*/

// we now have an uncaught promise -- the promise that's returned from the fetch function was rejected

// there are TWO ways of handling rejections
// 1.) passing a second callback function into the "then" method as a parameter. the first param is ALWAYS for a successful promise. the second param is ALWAYS for a rejected one.
// this SECOND callback function will be called with an argument which is basically the error itself.
// 2.)

// we "handled" error by displaying the alert window. the error we saw previously, the "uncaught" error in console, is gone, because we caught/handled the error by showing the alert.

// there are no more errors in the code at this point, because the first fetch promise failed and threw an error. therefore, since the second fetch promise relies on the first, the second one will not run nor will there be an error generated by the second one either.

// WHAT IF -- what if the first fetch promise was successful but the SECOND one was rejected/threw an error?

// we would also have to catch and error there, too.
// HOWEVER, this violates the DRY method and there is a better way to do this

// IT IS possible to program the error handling/catching globally in just one central place!

// Instead of all of these CB functions, we can delete them. AND to substitute all of the CB functions to catch the errors, we can handle all of the errors right at the end of the chain by adding a catch() method!

// then(data => ...).catch(err => alert(err))

// and we can use the same callback function that was in our code twice, within this code, which was (err => alert(err))

// the catch() method will catch any errors that occur at any place in this entire promise chain, no matter where it is. errors propgate down the chain until they are caught, and if uncaught, you get an 'uncaught error' error.

// instead of the annoying alert window, we can use console.error() to display a message in the console with the typical red error background found with other errors in console. this is useful because sometimes a simple message or string without any formatting in console isn't enough to show the end user there is an error. the formatting and red helps convey that error in the UI to a user for a user to see.

// that is a more, real-use case of the catch block.

// ANOTHER method that is available that IS available on ALL promises

// there is also the finally() method.

// use this method for seomthing that always needs to happen, no matter the result of the promise
// a real-use method is the rotating circles or spinners when you load some data. these apps show a spinner when an async operation starts and hide it when it completes. that happens no matter if the operation was successful or not. for this, finally() is perfect.
// the only way this actually works is because catch() itself also returns a promise, that's the only way this here can work. this only works on promises. this can only work if catch itself also returns a promise.

// lets try to simulate another error

// we are trying to search for a country that doesn't exist

// getCountryData2('asdafdsd'); // Cannot read property 'flag' of undefined.

// this error is reflected with status code 404, they did not find a country with that name. the promise WAS fulfilled, because promises only fail due to no internet connection.

// LECTURE: Throwing Errors Manually

// we will fix the request 404 error from last lecture. the problem is that during the fetch, there was a 404 error b/c our API couldn't find any country with the given name 'asdafdsd'. the promise does not get rejected, therefore we have to do it manually.

// what we did first is go back to the first then() method on the fetch request and add a block of code, and console log the response from the then method

// NOTE: because we added the block {} back, we HAVE TO return the response.json() MANUALLY ie: return response.json()

// we can now use the fact that this response has the ok property set to false to basically reject the promise ourselves manually.

// so, what we did is:
// create new error using the constructor function and mpassing in a message which is the error msg
// then we use the 'throw' keyword which will immediately terminate the current function, just like the 'return' keyword
// the effect of creating and throwing an error in any of these 'then' methods is that the promise will immediately reject. basically the promise returned by the 'then' handler with the error checking will be a rejected promise.
// then, this rejection will propagate all the way down to the catch handler at the end. it also found in the text error on the DOM, too. any error that happens in any of the then handlers, will immediately terminate that 'then' handler and propgate all the way down and display with the catch method.

// the same is true for any other error. because somewhere in the renderCountry function, we are trying to read the flag. since it did not have a flag, the error caused the rejection of the promise.

// why should we handle these errors?
// its the only way we can display an error message on the screen, in the DOM, in text for the user.
// it is also a bad practed to leave rejected promises hanging around without handling them.

// be sure to always catch your errors, and if necessary, you can also use finally.

// what if there was no error in the first fetch, but there was in the second?
// the error is not handled -- after removing the code to trigger an error on the first fetch, intentionally causing an error on the second fetch throws and error, but it does display the first fetch successfully, which is portugals info.

// we have now repeated two parts of our code in the requests:

/*

.then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found. (${response.status})`);
      // if response.ok is false

      return response.json();
    })

*/

// we will make a helper function for this code above, it will wrap up the fetch, error handling, and conversion to JSON. will call this function getJSON

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      // if response.ok is false
      throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// this getJSON function will actually return a promise, so then, this is just like any other promise that we can call here in our promise chain, which lets us replace all of this:

/*
fetch(`https://restcountries.eu/rest/v2/name/${country}
    `)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found. (${response.status})`);
      // if response.ok is false

      return response.json();
    })
*/

const getCountryData2 = function (country) {
  // Country 1

  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}
  `,
    'Country not found.'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      //   const neighbour = 'dfsdfdef';

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong! ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// the code works great, but there is something else that we have to handle too!
// *** the fact that there may be a county that has NO neighbor(s)!! ***

// what we are doing for that now is just using a return statement/guard clause if there is no neighbor. this doesn't really do anything, just stops the code from running.

// getCountryData2('australia'); // Cannot get property 'flag' of undefined
// the code tries to render the neighbor country that does not exist

// what we want to do for this is to throw a new error that will get caught in our catch handler.

// we threw a new error based on that condition. this is very important for any UI that we are building. errors will happen -- it is guaranteed, and it needs to be prepared for that.

// BIG TAKEAWAY
// whenever we want to create some error that we want to handle in the catch handler, all we need to do is to throw and create a new error, just like we did above.
// we can do that for multiple reasons. for example, a country that has no neighbor.
// remember that this works because throwing an error inside of the callback function of the 'then' method will IMMEDIATELY reject this promise.
// this rejected promise will then propagate and travel down the chain until it is eventually caught somewhere, eventually in the catch handler.

// make sure to keep this technique in mind for real work applications.

// LECTURE: Asynchronous Behind the Scenes: The Event Loop

// review of the JS runtime:

// a JS runtime is a container that includes all the pieces fo execture JS code.
// the heart of every JS runtime is the engine, where the code is executed and where objects are stored in memory.
// these two things happen in the callstack and the heap.

// JS has ONLY one thread of execution. it can only do one thing at a time! there is no multitasking in JS. In Java, you can execute multiple lines of code at the same time, but not in JS.

// web APIs environment -- web APIs provided to the engine, but are NOT part of the JS language itself. APIs such as DOM, Timers, Fetch API, geolocation API.

// callback queue -- data structure that holds all of the ready-to-be-executed callback functions that are attached to some event that has occurred.

// finally, whenever the callstack is empty, the event loop takes callbacks from the callback queue and puts them into the call stack so that they can be executed.

// the event loop is the ESSENTIAL piece that makes asynchronous behavior possible in JavaScript.

// concurrency model - simply how a language handles multiple things happening at the time time. JavaScript has a non-blocking concurrency model.

// how does non-blocking concurrency actually work?
// and why is the event loop so important?

// if there is only one thread in javascript, how can async code be executed in a NON-blocking way?

// thats the big question to answer in this video.

// async tasks runs in web api's where the async tasks related to the dom will run

// the images load async, if they were sync, it would do so in the call stack and blocking the execution of the rest of the code. the images load in the web apis environment.

// the async fetch operation is executed in the web api's environment, not the call stack.

// the event loop

// It looks into the call stack and determines whether it's empty or not, except of course, for the global context.
// THEN, if the stack is indeed EMPTY, which means that there's currently no code being executed, THEN it will take the first callback from the callback queue, and PUT it on the call stack to be executed.
// THIS is called an EVENT LOOP TICK.

// So, each time the event loop takes a callback from the callback queue, we say that "there was an EVENT LOOP tick".
// The event loop has the extremely important task of doing coordination between the call stack and the callbacks in the callback queue.

// ***** The event loop is basically WHO decides EXACTLY when each callback is executed ***** //

// We can also say that the event loop does the ORCHESTRATION of this ENTIRE JavaScript runtime.

// Another thing that becomes clear from the whole explanation is that the JavaScript language itself has actually NO SENSE OF TIME! This is because everything that is ASYNCRHONOUS does NOT HAPPEN IN THE ENGINE! It's the RUNTIME who manages ALL ASYNCHRONOUS behavior, and it's the EVENT LOOP who decides which code will be executed NEXT.

// THE ENGINE itself simply executes WHATEVER code it has been given.

// RECAP:

/*

Example code:

el = document.querySelector('img');
el.src = 'dog.jpg';
el.addEventListener('load', () => {
    el.classList.add('fadeIn');
});

fetch('https://someurl.com/api').then(res => console.log(res))

// More code...

*/

// the image started loading asynchronously in the web APIs environment and NOT in the call stack
// then, we used addEventListener to attach a callback function to the image load event. This callback is basically our asynchronous code -- code that we deferred into the future to execute when the image loads at some point in the future.
// in the meantime, the rest of our code kept running.
// addEventListener did NOT put the callback directly in the callback queue -- it simply registered the callback, which then kept waiting in the web APIs environment until the load event was fired off. Only then the environment put the callback in the queue.
// Then, while in the queue, the callback kept waiting for the event loop to pick it up and put it on the call stack. This happened as soon as the callback was first in line and the call stack was empty.
// All this happened for the image to load in the background in a NON-blocking way

// in a nutshell, the webAPIs environment, the callback queue, and the event loop, all together, make it possible for asynchronous code to be executed in a non blocking way, even with only ONE thread of executing in the JS engine.

// WE STILL have the Fetch function grabbing data from the AJAX call in the background -- this is happening with a promise

// callbacks related to promises do NOT go into the callback queue. the callback that we have coming from the promise will NOT be moved callback queue.

// INSTEAD, callbacks of promises have a SPECIAL QUEUE for themselves, which is called the MICROTASKS QUEUE.
// MICROTASKS QUEUE -- special queue for callback functions of promises
// the MICROTASKS QUEUE has PRIORITY over the callback queue.
// at the end of an event loop tick, (ie, after a callback has been taken from the callback queue), the event loop will check if there are any callbacks in the microtasks queue. IF there are, it will run ALL of them BEFORE it will run any more callbacks in the regular callback queue.
// we call these callbacks from promises MICROTASKS.

// ***** IF one microtask ADDS A NEW microtask, that NEW microtask is ALSO executed before ANY callbacks from the regular callback queue. ***** //

// this means the microtask queue can essentially starve the callback queue, meaning if we keep adding more and more microtasks, the callbacks in the callback queue can never execute. this is usually never an issue.

// LECTURE: The Event Loop in Practice

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// // Promise.resolve allows us to build a promise that is IMMEDIATELY resolved, or one that immediately has a success value
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// In what order do you think these messages will be logged to the console?
// My guess: 1, 2, ?

// Answer, by thinking about it:
// **** ANY top level code, AKA code OUTSIDE of any callback, will run FIRST. **** //

// given this, the first two messages are
// 1.) console.log('Test start')
// 2.) console.log('Test end')
// these are two synchronous pieces of code.

// the next two, between the timer and the resolved promise, may be trickier.
// both the timer and the promise will finish at the exact same time, both right after zero seconds.
// which one will be handled first? ie which of the two callbacks will be executed first?

// technically the timer appears first in the code so it kind of finished first, so it will be put in the callback queue first, but this does NOT mean the callback will be executed first, because of the MICROTASKS queue, and callbacks of microtasks are executed first, then callbacks are executed first.

// after this code runs, there will be one callback in the callback queue and one callback in the microtasks queue. as a result, the microtasks callback will be executed first, then the callback in the callback queue for the timer.

// the console result:
/*
Test start          (1)
Test end            (4)
Resolved promise 1  (3)
0 sec timer         (2)
*/

// remember this --> BECAUSE microtasks have priority over regular callbacks, IF ONE of the microtasks takes a LONG TIME to run, then the timer willa ctually be delayed and not run after the zero seconds that we specified here. instead, it will run a little bit later just after the microtask is done with its work

// this in practice:

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(res);
// });

// the promise will STILL be resolved immediately, regardless if the microtask takes forever to finish.

// the console result, after this addition:
/*
Test start          (1)
Test end            (4)
Resolved promise 1  (3)
Resolved promise 2  (finished like 20 sec after page loaded)
0 sec timer         (2)
*/

// this is proof that the zero seconds in the setTimer function are NOT a guarantee. this means that you CANNOT do high-precision things with JavaScript timers.

// LECTURE: Building a Simple Promise

// lets simulate a lottery using a promise, a fulfilled promise = win, rejected = lose

// promises are made with the Promise constructor
// the promise constructor has exactly one argument, which is the EXECUTOR function

// const lotteryPromise = new Promise(function (resolve, reject) {
//   // this executor function should eventually produce a result value, the value that is going to be the future value of the promise

//   let randomNumber = Math.random();

//   console.log('Lottery drawing is happening now...');
//   setTimeout(function () {
//     if (randomNumber >= 0.5) {
//       resolve(`You WIN! Number: ${randomNumber}`);
//       // in this situation, we say that we win the lottery, which means a fulfilled promise. and in order to set the promise as fulfilled, we use the resolve() function.

//       // calling the resolve function like above will mark the promise as a fulfilled promise, which we can also say a resolved promise.

//       // in the resolve function, we pass the fulfilled value of the promise so that it can later be consumed with the 'then' method
//     } else {
//       reject(new Error(`You LOSE your money! Number: ${randomNumber}`));
//       // call reject function to reject promise
//       // we pass the error message into the reject function that we later want to be able to access in the catch method.
//     }
//   }, 2000);
// });

// as soon as the promise constructor runs, it will automatically execute this executor function that we pass in. as it executes this function, it will do so by passing in TWO OTHER arguments: the RESOLVE and REJECT functions.

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// THIS IS HOW WE ENCAPSULATE ANY ASYCHRONOUS BEHAVIOR INTO A PROMISE //

// most of the time, all we actually do is consume promises. we usually only build promises to basically wrap old callback based functions into promises. this is a process that we call PROMISIFYING
// Promisifying = converting callback-based asynchronous behvaior to promise-based.

// In action:

// promisify the setTimeout function and create a wait function.

// Promisifying setTimeout, a more REAL-WORLD example

// const wait = function (seconds) {
//   // only need resolve argument in the exectuor function, as it is impossible for a timer to fail, so we will never mark this promise as rejected. we don't need to specify that reject argument at all.
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log(`1 second passed`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`2 seconds passed`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`3 seconds passed`);
//     return wait(1);
//   })
//   .then(() => console.log(`4 seconds passed`));

// for reference:
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//         setTimeout(() => {
//           console.log('5 seconds passed');
//           setTimeout(() => {
//             console.log('6 seconds passed');
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// you can ALSO create a FULFILLED OR REJECTED promise IMMEDIATELY

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('cde')).catch(err => console.error(err));
// then is not necessary, because there will be no resolved value on a rejected promise.

// LECTURE: Promisifying the Geolocation API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   error => reject(error)
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//     // this function off loaded the work to the background, ie the web API environment in the browser, and then JS moved on to the next line, console.log(...) this is very clearly a callback-based API

//     // this is another great opportunity to promisify a callback based API to a promise-based API.
//   });
// };

// getPosition().then(pos => console.log(pos));

// BEGIN GEOLOCATION APP FUNCTIONALITY //

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })

    // 2.)

    .then(response => {
      //   console.log(response.status);

      if (response.status === 403)
        console.error(`Error ${response.status}: You are requesting too fast!`);

      return response.json();
    })
    // 3.)
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      // PART 2 //
      // Plug relevant attribute from geocoding API and plug in into countries API

      // 6.)
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      //   console.log(response);

      if (response.status === 403)
        throw new Error(
          `Error ${response.status}: You are requesting too fast!`
        );

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    //   console.log(data)
    //   console.log(data[0]);
    // needed to use data[0] instead of just data as param in renderCountry

    // 7.)

    .catch(error => console.error(error.message));
};

btn.addEventListener('click', whereAmI);

// END GEOLOCATION APP FUNCTIONALITY //

// LECTURE: Conusming Promises with Async/Await

// since ES 2017, there is an even better way to consume promises with async/await

// start by creating a special type of function, which is an async function
// we create an async function by adding 'async' in front of the function
// this makes the function an asynchronous function, a function that will keep running in the background while performing the code inside of it.

// then, when this function is done, it automatically returns a promise. more on that in the next video

// inside an async function, we can have ONE or MORE await statements

// after await, we need a promise. we're able to use the promise returned from the fetch function

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
//   console.log(res)
// );

const whereAmI2 = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // after the fetch finishes, the whole value of the await expression is going to be the resolved value of the promise. we can store this into a variable.
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (error) {
    console.error(`${error}. Please try again!`);
    renderError(error);

    // Reject promise returned from async function
    throw err;
  }
};

// console.log('1: Will get location');
// const city = whereAmI2();
// console.log(city);
// logs a PENDING promise as the second log in console, as async functions always return a promise. if clicked on, it does contain the final fulfilled state and data. inside the promise object, there is a promise result with the string that was returned.
// the reason the promise is returns is because JS does not know what the output will be at that point in the code because it is not finished running.
// console.log('3: Finished getting location');
// whereAmI2()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => {
//     console.log('3: Finished getting location');
//   });
// by doing this instead, we can successfully return a value from the function instead of a promise, like above.

// in an async function like this one, we can use the await keyword to basically await for the result of this promise.

// await will stop the code execution at this point of the function until the promise is fulfilled. in this case, until the data has been fetched.

// isn't stopping the code blocking the execution?

// the answer is no because -- stopping execution in an async function is not a problem because this function is running asynchronously in the background. therefore, it is not blocking the main thread of execution, ie not blocking the call stack. that's what's so special about async/await.

// it makes our code look like regular synchronous code while, behind the scenes, everything is in fact asynchronous.

// async/await is syntactic sugar over the 'then' method in promises
// behind the scenes, we are still using promises. we are just using a different way of consuming them in this case

// LECTURE: Error Handling with try...catch

// with async await, we CAN'T use the catch() method to handle errors like we did before, because we can't attach it anywhere.

// instead, we use something called a try ... catch statement.

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// catching an error this way does not make the script die, and stop altogether, and it allows us to handle the error accordingly

// they can be used to handle real errors in async functions. we wrapped our whole function into a try block.

// NEVER ignore handling errors, especially when it comes to asynchronous code

// LECTURE: Returning Values from Async Functions

// whereAmI()
// .then(city => console.log(`2: ${city}`))
// .catch(err => console.error(`2: ${err.message}`));

// in this example above, even if the whereAmI function has an error, the promise still gets fulfilled, and the console log on the then still gets executred, meaning the then function still executes, too. BUT, the catch method does not execute.. even though there was an error in the async function, the promise still gets fulfilled

// in order to have the catch function catch and handle that error, we have to rethrow the error by using throw err in the try catch error block

// sometimes it is important to do this, so rethrowing an error is the correct solution to that problem.

// if we wanted to fix the fact that the 3 is printed before the 2, how would we do that?

// we an add a finally method, because finally will always be executed no matter what -- added finally()

// there is still an issue, however, the issue is that doing the whereAmI2 function chain kind of mixes up the philosphy of async/await with handling promises using then and catch. this is a non-typical way of writing these, because we are combining the new async/await statements with the older then catch and finally methods.

// so lets convert it to async/await as well, and we can do that because we can treat the promise that whereAmI2 returns just like any other promise, therefore we are able to handle it using async/await

// whereAmI2()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => {
//     console.log('3: Finished getting location');
//   });

// it would be great if we could simply use await WITHOUT the async function. that doesn't really work, at least for right now (as of 9/3/2021). there is a proposal in the works to make that happen.

// for now, await can only be used inside an async function.

// we don't want a new complete function here. instead, we can use an IIFE.

// remember what an IIFE is?
// IIFE: immediately invoked function expressions
// example:
(function () {
  // code..
})();

// we write a function, and in the end, simply call it.

// as a result, we can also simply create an async IIFE, too!

(async function () {
  // code..
})();

// convert the whereAmI2 to an async IIFE

// (async function () {
//   try {
//     const city = await whereAmI2();
//     console.log(`2: ${city}`);
//   } catch (error) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log('3: Finished getting location');
// })();

// its common that we have async functions calling other async functions and returning values between them.

// LECTURE: Running Promises in Parallel

// imagine we wanted to get some data about three countries at the same time but in which the order the data arrives does not matter at all

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c1}`
//     // );
//     // const [data2] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c2}`
//     // );
//     // const [data3] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c3}`
//     // );
//     // console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);

//     console.log(data.map(d => d[0].capital));
//     // this returns an array, which has three arrays inside, and each array inside contains the object we are looking for. so, Promise.all() receives and array and returns an array

//     // to create the same output as before, all we have to do is loop over this data and take out the data that we want

//     // **** NOTE: IF one of the promises REJECTS, then the ENTIRE Promise.all REJECTS as well!! ****
//     // Promise.all() short circuits when one promise rejects
//   } catch (error) {
//     console.error(error);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

// on the surface, what we wrote works and somewhat makes sense. here's why it doesn't make so much sense after all.

// what we did -- basically, is to run all of these AJAX calls one after another, even though the second one here does not depend on the first one, and the result of the third one does not depend on the second one.

// and none of them depend on any of the other ones at all.

// we can run these at the same time, in parallel. to do so, we use the Promise.all() combinator function.

// all() takes in an array of promises and it will return a new promise, which will then run all of the promises in the array at the same time.

// LECTURE: Other Promise Combinators: race, allSettled, and any

// three other promise combinators

// Promise.race
// receives an array of promises, and also returns a promise, just like all other combinators
// the PROMISE RETURNED by Promise.race is settled AS SOON AS ONE of the input promises settles.
// settled means that a value is available, but it doesn't matter if the promise got rejected or fulfilled
// in Promise.race, the first settled promise wins the race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

// these three promises will race against each other, like in a real race.

// IF the WINNING promise is a FULFILLED promise, then the FULFILLMENT value of this WHOLE race promise will be FULFILLMENT VALUE of the WINNING promise.

// remember: we only get one result in promise.race, and not an array of all three promises

// a promise that gets REJECTED can also win the race
// promise.race SHORT CIRCUITS whenever one of the promises gets settled, which means no matter if fulfilled or rejected.

// another example, it's very useful to prevent against never-ending promises, or very long running promises.
// if your user has a very bad internet connection, a fetch request in your application might take too lonk to actually be useful.
// we can create a special timeout promise that automatically rejects after a certain time has passed.

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

// we can have the ajax call we made earlier race against the timeout function.

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.race and Promise.all are by far the two most important combinators

// Promise.allSettled
// takes in an array of promises again and will simply return an array of all of the settled promises, no matter if the promises got rejected or not.
// Promise.allSettled never short circuits.
// will return all of the results of all of the promises.

// from ES2020

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Failure'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// output:
// [
//   {
//     status: 'fulfilled',
//     value: 'Success',
//   },
//   {
//     status: 'rejected',
//     reason: 'Failure',
//   },
//   {
//     status: 'fulfilled',
//     value: 'Success',
//   },
// ];

// vs. promise.all

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Failure'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// output: Failure

// promise.all will short circuit if there is one error, or one rejected promise.

// that's the difference between these two

// Promise.any
// from ES2021

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Failure'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// outputs Success

// Promise.any takes in an array of multiple promises and will return the FIRST FULFILLED promise and will simply ignore rejected promises.
// very similar to promice.race, except the different is that rejected promises are IGNORED.
// therefore, the results of promise.any is always going to be a FULFILLEd promise, UNLESS they ALL reject.
