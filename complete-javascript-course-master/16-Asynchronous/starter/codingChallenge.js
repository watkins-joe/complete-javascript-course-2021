// // 'use strict'

// Coding Challenge #1
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time �
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating �
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// The Complete JavaScript Course 31
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK �

// Test data

// let coords1 = [52.508, 13.381];
// let coords2 = [19.037, 72.873];
// let coords3 = [-33.933, 18.474];

// const countriesContainer = document.querySelector('.countries');

// // render country into HTML

// const renderCountry = function (data, className) {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} ${'million'}</p>
//               <p class="country__row"><span>🗣️</span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//               }</p>
//           </div>
//       </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// // PART 1 //

// // 1.)

// const whereAmI = function ([lat, lng]) {
//   // 2.)
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       //   console.log(response.status);

//       if (response.status === 403)
//         console.error(`Error ${response.status}: You are requesting too fast!`);

//       return response.json();
//     })
//     // 3.)
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       // PART 2 //
//       // Plug relevant attribute from geocoding API and plug in into countries API

//       // 6.)
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => {
//       //   console.log(response);

//       if (response.status === 403)
//         // console.error(
//         //   `Error ${response.status}: You are requesting too fast!`
//         // );
//         throw new Error(
//           `Error ${response.status}: You are requesting too fast!`
//         );

//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     //   console.log(data)
//     //   console.log(data[0]);
//     // needed to use data[0] instead of just data as param in renderCountry

//     // 7.)

//     .catch(error => console.error(error.message));
// };

// whereAmI(coords1);
// whereAmI(coords2);
// whereAmI(coords3);

// // done at 4:46 pm 9/1/21

////////////////////////////////

// Coding Challenge #2
// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own �
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that �)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
// GOOD LUCK �

// PART 1 //

// // 1.)

// // global img var
// let imgContainer = document.querySelector('.images');

// const toggleImgDisplay = function (img) {
//   if (img.style.display === 'block') {
//     img.style.display = 'none';
//   } else {
//     img.style.display = 'block';
//   }
// };

// const createImage = imgPath => {
//   return new Promise(function (resolve, reject) {
//     let img = document.createElement('img');
//     img.src = imgPath;

//     // 2a.)
//     img.addEventListener('load', function () {
//       imgContainer.appendChild(img);
//       img.style.display = 'block';
//       resolve(img);
//     });
//     // 2b.)
//     img.addEventListener('error', function () {
//       reject(new Error(`Error loading image: ${imgPath}`));
//     });
//     // PART 2 //
//   });
// };

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // global current image var
// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log(`Image ${currentImg.src.slice(-9)} loaded`);
//     // 5.)
//     return wait(2);
//   })
//   .then(() => {
//     // 6a.)
//     currentImg.style.display = 'none';
//     // 6b.)
//     console.log(`Image ${currentImg.src.slice(-9)} hidden`);
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`Image ${currentImg.src.slice(-9)} loaded`);
//     // 7.)
//     return wait(2);
//   })
//   .then(() => {
//     // 8.)
//     currentImg.style.display = 'none';
//     console.log(`Image ${currentImg.src.slice(-9)} hidden`);
//   })
//   // 4.)
//   .catch(err => console.error(err));

//////////////////

// Coding Challenge #3
// Your tasks:
// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async/await (only the part where the promise is consumed, reuse the
// 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array �
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK �

// wait function

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

let imgContainer = document.querySelector('.images');

// createImage function

const createImage = imgPath => {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.appendChild(img);
      img.style.display = 'block';
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error(`Error loading image: ${imgPath}`));
    });
  });
};

// PART 1 //

// 1.)
// loadNPause function

// const loadNPause = async function (seconds, img) {
//   await setTimeout(function () {
//     console.log(
//       `Done waiting for ${seconds} ${seconds > 1 ? 'seconds' : 'second'}!`
//     );
//     currentImg = img;
//     if (currentImg.style.display == 'none') {
//       currentImg.style.display = 'block';
//     } else {
//       currentImg.style.display = 'none';
//     }
//   }, seconds * 1000);
//   console.log(
//     `Waiting for ${seconds} ${seconds > 1 ? 'seconds' : 'second'}...`
//   );
// };

// create the images

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log(`Image ${currentImg.src.slice(-9)} loaded`);
//     loadNPause(2, img);
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`Image ${currentImg.src.slice(-9)} loaded`);
//     loadNPause(2, img);
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`Image ${currentImg.src.slice(-9)} loaded`);
//     loadNPause(2, img);
//   })
//   // 3.) tested error handler.
//   .catch(err => console.error(err));

// 2.) I like the new one more, so far. Not sure if it's right.

// PART 2 //

// let imageArray = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

// const loadAll = async function (imgArr) {
//   let imgs = imgArr.map(img => {
//     console.log(img);
//     createImage(img);
//   });
//   return Promise.all([imgs]);
// };

// console.log(loadAll(imageArray));

// ANSWER

// PART 1

const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log(`Image ${img.src.slice(-9)} loaded`);
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log(`Image ${img.src.slice(-9)} loaded`);
    await wait(2);
    img.style.display = 'none';

    // Load image 3
    img = await createImage('img/img-3.jpg');
    console.log(`Image ${img.src.slice(-9)} loaded`);
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};

// loadNPause(); pause function for part 2

// PART 2

let imageArray = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    // 3.) we got three promises, not the images themselves.

    // the arrow function always returns something, we have an implicit return, it's the same as writing return at the end of a function. async functions also always return a promise, and not really the value that we are looking for. instead, we want to return the fulfilled value of the promise that the async function returns.

    // in order to get the images out of the array we could..
    // get each promise out of the array and manually await it, but that wouldn't make much sense
    // 1.) we would have additional work
    // 2.) that work would not be happening in parallel. we want it in parallel.

    // better solution is Promise.all
    const imgsEl = await Promise.all(imgs);

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.error(error);
  }
};

loadAll(imageArray);

// END OF ALL CODING CHALLENGES IN COURSE //
