// LECTURE: An Overview of Modern JavaScript Development

// back in the day, all code would be written in one big script or multiple scripts.

// nowawdays, code is separated into modules.
// we can also include 3rd party modules in our own code (aka packages, like in npm, node package manager)

// npm is go-to repo for many js packages.

// npm is a simple command line interface. npm is both the repo and the program we use to install and manage these packages

// project has to go thru build process, that bundles all of the modules and packages together.

// bundling --> joining all modules into one file
// bundling is very important for two reasons
// 1.) older browsers don't support modules at all, so code in a module cannot be executed by any older browser
// 2.) better for performance to send less files to the browser

// transpiling/polyfilling --> convert all modern JS syntax and feature sback to old ES5 syntax, so older browsers can userstand out code without breaking. Done with a tool called Babel.

// after these two steps, we end up with our production JS bundle. instead, we use a special tool to implement the build process for us, common tools are webpack and Parcel. JS bundlers -- they take our raw code and transform it into JS bundles.

// webpack is the more popular one, can be hard to setup,
// parcel is zero config bundler, works out of the box.

// these tools are also available on NPM.

// LECTURE: An Overview of Modules in JavaScript

// A module is a reusable piece of code that encapsulates implementation details of a certain part of our project.
// A module is usually a standalone file, but it doesn't have to be.

// we can export values out of a module.
// whatever we export from a module is called the public API.

// this API is consumed by importing values into a module. we can usually import modules into other modules, commonly called dependencies. sometime modules require code and are dependent on code from other modules to work right

// this is not specific to only JS.

// we can write code w/o modules, like we have been doing until this point. we have done this because our applications have been very simple.

// advantages of modules
// 1.) modules make it very easy to write software
// think of modules as small building blocks to build very complex applications
// 2.) each module can be developed in complete isolation. you can have one engineer working on one module, and another engineer working on a different module, and even another one on another module. each engineer can work on their own module without having to understand what the other engineers are doing, and without understanding how the final project/app works itself.

// isolating modules is a huge advantage, makes it easy to collaborate on a large team.

// 3.) modules make it very easy to abstract our code, we can use modules to implement low-level code, then other modules that don't care about the low level stuff, can import these abstractions and use them
// 4.) modules naturally lead to a more organized codebase. when we break up our code into smaller modules, it can make it easier to understand.
// 5.) modules allow us to easily reuse the same code, even across multiple projects

// Modules, SPECIFICALLY in JavaScript

// Native JavaScript (ES6) Modules

// as of ES6, JS has a native built-in module system.

// did have modules before ES6, but had to implement ourselves or use external libraries.

// ES6 Modules: Modules stored in files, exactly ONE MODULE PER FILE.

// scripts are usually also files, right? true!

// comparing ES6 modules VS. old-school scripts

// ES6 modules
// 1.) Top-level variables: Scoped to module
// 2.) Default mode: Strict mode
// 3.) Top-level 'this' keyword: undefined
// 4.) Import and export values: YES, but can ONLY HAPPEN at TOP-LEVEL (meaning outside of ANY function or ANY if-block). Imports are HOISTED!
// 5.) HTML linking: <script type="module">
// 6.) File downloading: Asynchronous

// Script
// 1.) Top-level variables: Global
// 2.) Default mode: "Sloppy" mode
// 3.) Top-level 'this' keyword: window
// 4.) Import and export values: NO
// 5.) HTML linking: <script>
// 6.) File downloading: Synchronous by default, UNLESS async or defer attributes used on <script> tag

// How ES6 Modules are Imported

// 1.) Index.js is parsed
// 2.) Modules are imported before Index.js execution
// -- Modules are imported SYNCHRONOUSLY
// -- This is possible thanks to top-level ('static') imports, which make imports known before execution
// -- This makes bundling and dead code elimination possible
// 3.) Modules are downloaded from the server ASYNCHRONOUSLY
// 4.) Modules are parsed and module exports are LINKED to the IMPORTS in index.js
// 5.) Code in imported modules is EXECUTED
// 6.) Importing module, index.js in this case, is finally EXECUTED

// LECTURE: Exporting and Importing in ES6 Modules

// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// import * as ShoppingCart from './shoppingCart.js';

// addToCart('bread', 5); // works
// console.log(price, tq); // works

// console.log('Importing module');

// 'Exporting module' appears first in the console.log list, just as we learned
// The importing module code is executed last, the modules exporting/those being imported are executed first

// All importing statements are hoisted to the top, and are all typically written at the top of the page.

// Strict mode is also unnecessary to write at the top, as all modules are executed in strict mode by default

// console.log(shippingCost); // shippingCost is not defined, the variables are scoped to the current module, can only use them in the shoppingCart module at this time

// if we wanted to use them in the script.js module, we would have to use EXPORTS.

// TWO TYPES of EXPORTS;
// 1.) Named Exports
// easiest way of exporting anything -- all we have to do is put 'export' in front of anything that we want to export
// importing the add to cart function from shoppingCart:
// write export in front of the function
// write addToCart in from of import statement in script.js
// follow addToCart with 'from'
// it should look like: import { addToCart } from './shoppingCart.js';

// you have to give them the same name as the item you are importing
// you also have to put the item you are importing into { curly braces }

// EXPORTS CAN ONLY HAPPEN WITH TOP LEVEL CODE, must be global scoped, not inside of an if-statement or anything similar!!

// can also export MULTIPLE things from a module with NAMED EXPORTS, this is the MAIN USE CASE of named exports
// example:
// adding two more variables to import from shoppingCart.js:
// import { addToCart, totalPrice, totalQuantity } from './shoppingCart.js';
// we can ALSO change the NAME of totalPrice to something else by doing this:
// import { addToCart, totalPrice as price, totalQuantity }
// this can also be done in the exports, too!
// export { ... totalQuantity as tq }

// we can also import ALL of the exports of a module at the same time!
// import * as ShoppingCart from './shoppingCart'
// this will create an object containing everything that is exported from the module, use capital lettering on the words, kind of like a class

// ShoppingCart.addToCart('bread', 5); // works

// console.log(ShoppingCart.totalPrice);

// 2.) Default Exports

// used only when we want to export ONE thing per module, which is the reason why they are called default

// work similarly to named exports, except that we have to write the word default
// example:
// const buyItem = function(product, quantity) {
//  console.log(`You bought ${quantity} ${product}`)
// }
// export default function(product, quantity) {
//  console.log(`You bought ${quantity} ${product}`)
// }

// you don't export the item with it's name, like a function's name, only the value of the function/constant itself, NOT the variable. no name is involved at all

// then, when we import it, we can give it any name that we want.

// import add from './shoppingCart.js'
// this will then import the default export, and we can give it any name we want. in this case, we gave it the 'add' name

import add, { cart } from './shoppingCart.js';

// console.log(add); // logs function we exported as default

add('pizza', 2); // logs 2 pizza was added to cart

// right now, we are importing the same module twice. typically, we do not do that, but this is only for example purposes.

// can even mix all of them in the same import statement, we could have default imports, and named imports and exports all at the same time

// it would look like this:
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'

// in practice, however, we usually NEVER mix named and default exports in the same module. do not do this
// one default export per module is standard. this is also why it is easier to import a default export because we don't even need the { curly braces }, which was done on purpose.

// Proving that imports are a LIVE connection to exports:

// very important to keep in mind

// first, we are going to export the cart array in shoppingCart.js

// watch what happens as we add a couple more products to the cart array, that is currently EMPTY in the shoppingCart.js module

// import statement looks like this now: (even though we are not supposed to mi them, we need to in this case to make it work)
// import add, { cart } from './shoppingCart.js';

// add('pizza', 2);
// add('bread', 5);
// add('apples', 4);
// console.log(cart); // logs the cart full of products

// this proves that the import cart is not simply a COPY of the value. if it was, we would simply get the empty array. it is a live connection, and we are manipulating the array. they are the same object behind the scenes.
// imports and not copies of the export. they are a live connection and that means that they point to the same place in memory.

// LECTURE: The Module Pattern

// main goal of the module pattern is to encapsulate functionality, to have private data, and to expose a public API

// best way of achieving all of that is by simply using a function, because functions give us private data by default and allow us to return values, which can become our public API

// how the module pattern is implemented

// start by writing a function, usually an IIFE so we can call it immediately AND so it is only ever called once
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // undefined

// how are we able to access cart and manipulate the data even after the function has already ran once and returned?
// the answer is: closures.

// remember, closures allow a function to have access to all the variables present at it's birthplace, basically.

// the module pattern has been working long before ES6 was a thing for JS developers. works good, but has some limitations, which is why native modules were added in ES6.

// LECTURE: CommonJS Modules

// commonJS modules are important because they have been used in node.js for almost all of its existence. Node.js is a way of running JS on a web server outside of a browser.

// npm was originally only intended for node, which uses commonJS. only later did npm become the standard repository for the whole JS world. now, we are stuck with commonJS.

// in commonJS, one file is one module, just like ES6 modules

// pretend we want to export something from this module

// Export

// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} was added to cart`);
//   };

// now this would not work in the browser, but it would work in node.js
// the export keyword is an object, but it is not defined here in our code and also not in the browser, but in node.js it is an important object we can use.

// Import
//   const { addToCart } = require('./shoppingCart.js')
// again, not defined in our code or browser, but is in Node.js, as this is part of the commonJS specification

// there are different module systems, and that CommonJS is particularly important in the world of JS.

// LECTURE: A Brief Introduction to the Command Line

// on unix based systems -
// ls = show file contents (dir on windows)
// cd = change directory
// .. = going up in the directory
// go to diff folder = cd fileName (can start to type file, and hit tab to autocomplete)
// ../.. = move up two levels in directory
// clear = clear console logs
// mkdir fileName = make a new folder
// touch fileName.ext = make a new file with extension (edit on windows)
// live-server = opens live server
// Ctrl-C to complete command
// arrow key up = see past commands
// arrow key down = see past commands
// rm fileName.ext = delete files (del on windows)
// mv fileName.ext folderNameToMoveTo = move file to another folder (example: mv mapty.js ../ (moves file to parent folder))
// rmdir folderName = deletes/removes directory, only works for empty directories (at least on mac)
// can use another trick to remove directory on mac, using same 'rm' command from before, but we can use a flag. example: rm -R folderName (R stands for recursive) (recursively deleted all files in directory, as well as the directory itself)

// LECTURE: Introduction to NPM

// npm = node package manager, software on our CPU and package manager

// why do we need NPM?

// back in the day, we used to include external libraries right inside our HTML, using the script tag. this would then expose a global variable that we could use

// doesnt make much sense to have HTML load all of our JS. also, many times we would download a file to our CPU directly, but we would have to manually go to the site, download the new file, and overwrite the new one manually, and then include it here again, maybe with some different name with some other version number.

// that was a huge pain. before NPM, there wasn't a single repository that contained all the packages that we might need

// this made it worse and difficult to download more libraries and manage them on our computers

// in summary, this all used to be a huge pain and a huge mess.

// BEGINNING TO USE NPM //

// for any project that we want to use NPM with, we have to initialize it

// command: npm init

// installing leaflet library that we used before, BUT this time using NPM!

// command: 'npm install leaflet', or 'npm i leaflet'

// we cannot directly import leaflet into our code, we could only do that if later we used a module bundler but for not we are not doing that. so, we will not use leaflet for now

// installing Lodash
// Lodash is a collection of a ton of useful functions for erase, objects, functions, dates, and more. a lot of functions that could or should be in JS but are not.

// remember, we can't use CommonJS modules without a module bundler! looking for a special version of Lodash. looking for the lodash-es version, es denoting ES modules.

// npm i lodash-es

// lodash-es installed

// we want to include/import the lodash function for cloning objects

// we check the file cloneDeep.js, and see that it is a default export, meaning we can give it any name we want.

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// writing all of this this is not practical, we will use Parcel to fix this!

// with module bundlers, it is not necessary to specify the entire path to a module. instead, we can do this:

import cloneDeep from 'lodash-es';

// all we have to do is say that we want to include the lodash library, then parcel will automatically find the path to this module and will simply import it like this without us having to manually type the entire path to there

// much more useful than what we had before, and this works with all kinds of assets, such as HTML, CSS, or Sass files, or even images, and of course, all kinda of modules. not only ES6 modules, but this is also going to work with CommonJS modules

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: {
    loggedIn: true,
  },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state); // loggedIn copies to true, even though we change it to false in the original object, below. Lodash helped us create this deep clone. a good solution for a deep clone.

state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

// assume you want to move your project to another computer or share it with another developer, or even check it into version control like git.

// in all of these scenarios, you should NEVER EVER include the node_modules folder.

// in a real project, it will be huge! maybe 10s of thousands of files.

// well, if I copy my project without the node_modules folder, without the dependencies, will i have to install all of them one by one?

// what if I have 20 or 200 dependencies?

// if you don't have your modules anymore bc you moved computers or you are sharing stuff somewhere else, or they were deleted on accident, there is an EASY way to get it back!

// all we have to do is:
// npm i
// but without any package name. npm will reach into your package.json file, look at all of the dependencies, and install them back!

// LECTURE: Building with Parcel and NPM Scripts

// parcel is now a dev dependency as listed under the package.json file, and all of the modules in parcel are dependents of parcel.

// for us to use parcel, we have two choices

// 1.) NPX
// starting with NPX -- we can use this first
// npx parcel index.html
// entry point is index.html, because that is where we include our script.js, so basically the file that we want to bundle up.

// doing this, created another server on our machine, localhost:1234, and parcel created a dist folder that contains all of the code that is ready for production and that we will send to our final users.

// we had to remove the 'module' type from the html script tag in index.html because we are no longer using it as a module. doing so and saving made parcel rebuild it.

// we were thrown an error that parcel wasn't defined, and removing the module type from the script tag fixed it.

// the new script.randomNumbers.js in the new dist/index.html file is the new bundle itself.

// what we are doing now if the development step. everything is not yet compressed in order for us to check the code before the build step

// in parcel we can activate something called 'hot module replacement'

// below is code that only parcel understands. it will not make it into our final bundle, because the browser is not going to understand any of it.
if (module.hot) {
  module.hot.accept();
}

// what hot module reloading means is that whenever we change one of the modules, it will trigger a rebuild. but, that new, modified bundle will then automatically like magic, get injected into the browser without triggering a WHOLE page reload.

// useful for maintaining state on our webpage without reloading. would have come in very handy in our Bankist application, where whenever we reloaded the page,we needed to log in again into the application.

// with parcel and hot module replacement, that won't happen b/c the page will not reload

// 2.) NPM scripts

// another way of running locally installed packages on the command line

// allow us to basically automate repetitive tasks

// we therefore dont have to write npx parcel and all of that everything we want to use it

// we can simple create a script in package.json under the scripts property

// "scripts":{
//   "start": "parcel index.html"
// }

// by adding this script called 'start', we can then run in the command line and start parcel by typing 'npm run start' and that will run the start script and prevent us from having to type in the whole command.

// whenever we are done developing our project, it is time to build the FINAL bundle, the bundle that is compressed and has dead code elimination and all of that.

// for that, we need another parcel command. let's add that as another script here.

// "scripts":{
//   "start": "parcel index.html",
//   "build": "parcel build index.html"
// }

// again, using the script we are able to just type 'npm run build' instead of the whole parcel command

// we can also install packages globally
// npm i parcel -g

// it is recommended to install tools locally instead of globally, so they can always stay on the latest version

// LECTURE: Babel and Polyfilling

//
