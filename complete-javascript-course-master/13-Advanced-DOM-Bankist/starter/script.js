'use strict';

///////////////////////////////////////
// Selections
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header'); // logs header
const allSections = document.querySelectorAll('.section');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  // prevents anchor tag from jumping to top of page
  // on button modal click
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

// two ways of doing this

// 1.) old-school way

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); // DOMRect {...stuff}
  // DOMRect has a bunch of properties

  console.log(e.target.getBoundingClientRect()); // DOMRect {...stuff}

  // getBoundingClientRect() is relative to the visible viewport
  // and we can also get current scroll position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // logs Current scroll (X/Y) 0 292

  // can also read the height and width of viewport
  console.log(
    'height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientHeight
  );
  // logs height/width of viewport 864 864

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // top is relative to viewport, not the document
  // so this does not work

  // solution is to add the current scroll position
  // to the top value to determine the position of the section
  // relative to the top of the page instead of the viewport

  // Smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 2.) new, modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// the above code works, but it is not very efficient. the
// same function is attached to the same three elements.
// better solution is event delegation.

// in event deleation, we use the fact that events bubble up.
// and we do that by putting the eventListener on a common
// parent of all of the elements that we are interested in.

// event delegation steps

// 1.) Add event listener to common parent element
// 2.) Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  // logs nav__link, where the event originated

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// successfully implemented event delegation
// we added one big eventhandler function to the parent element
// and determined where the click event came from, and used
// matching strategy that ignores clicks from items we don't
// want

// more important use case -- working with elements not yet
// on the page, a great example are buttons added dynamically
// while using app. its not possible to add eventhandlers
// to elements that dont exist, but we can still handle events
// on elements that dont exist at beginning by using event
// delegation

// Tabbed component

// tabs.forEach(t => t.addEventListener('click', () => console.log('tab')));
// this is bad practice, what if we had 200 tabs? would have 200
// copies of this callback function here

// instead we will use event delegation, and by doing this
// we need to attach the event handler on the common parent
// element of all the elements that we're interest in,
// an in our case, that is this tabs container

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // finds closest parent with this class name
  // console.log(clicked);

  // Ignore any clicks where result is null

  // Guard clause
  // an if statement which will return early if some
  // condition is matched
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passing "argument" into handler, as it is technically
// impossible to have more than one argument in an eventhandler
// function

// if we want to pass more, we use the this keyword

// this is a workaround so we can pass arguments into handler functions

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// we can do even better and remove the anonymous callback
// functions entirely, by using the BIND method! sets the
// this keyword to whatever value we set bind to

// // Sticky navigation V1, bad performance version
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // make nav sticky as soon as we reach the first section

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
//   // using scroll event fires all the time, bad performance
//   // especially on mobile. we will look at another efficient tool.
// });

// Sticky Navigation using Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // make navigation bar appear exactly before the first section
  // starts, just like in demo
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  // null because we are interested in entire viewport
  threshold: 0,
  // rootMargin: '-90px',
  // root margin applies a box of 90 px which is height of nav
  // a visual margin, negative to show before
  // you will want to grab the height of the navbar dynamically
  // because responsiveness may change height and you do not
  // want height to be hard coded in this, use template
  // string and grab the height dynamically by using
  // nav.getBoundingClientRect().height
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // another guard clause
  // console.log(entry.isIntersecting);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // remove observers when the element has been shown
  // so that it does not keep observing
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images

// grab only images in document with attribute data-src
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src attribute with data-src
  entry.target.src = entry.target.dataset.src;

  // Listen for load event when image finishes loading
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // load images before we reach them
  rootMargin: '+200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider

// create Slider function for the entire slider itself
// as to not pollute the global namespace
const sliderFunction = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;
  // reading length of node list just like an array

  // Functions
  const createDots = function () {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      // Go to next slide
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    // -100, 0%, 100%, 200%
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const initSlider = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  initSlider();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Arrow key event listeners
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Using event delegation again, adding handler to dotContainer
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(curSlide);
    }
  });
};

// calling slider function
sliderFunction();

///////////////////////////////////////
// LECTURES

// LECTURE: How the DOM Really Works

// the dom is the interface between JS and the browser

// Allows us to make JS interact with the browser
// We can write JS to create, modify, and delete HTML elements,
// set styles, classes, and attributes; and listen and respond
// to events
// DOM tree is generated from an HTML document, which we can then
// interact with
// DOM is a very complex API that contains lots of methods and
// properties to interact with the DOM tree

// Inheritance -- inheritance means all of the child types
// get access to the methods and properties of all of their
// parent node types

// document, which we use in DOM manipulation, is just another
// type of node. .querySelector is available on both
// document and element node types

// we listen for events by calling the addEventListener method
// on an element or the document -- why does this work?

// because there is a special node type called EventTarget which
// is a parent of both the node type and also the window
// node type. And so with this, thanks to inheritance,
// we can call addEventListener on every single type of node
// in the DOM API because all elements as well as document
// and window and even text and comments will inherit this
// method, therefore, we will be able to use addEventListener
// on all of them just as if it was their own method

// NOTE: we never manually create an EvetnTarget object,
// its just an abstract type that we don't physically use
// in practice

// // LECTURE: Selecting, Creating, and Deleting Elements

// console.log(document.documentElement); // logs entire HTML
// console.log(document.head); // logs head
// console.log(document.body); // logs body

// const header = document.querySelector('.header'); // logs header
// const allSections = document.querySelectorAll('.section');

// console.log(allSections); // logs sections as NodeList

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// // returns HTML collection of buttons, a live-collection.
// // meaning, if the DOM is updated, the collection is updated
// // automatically

// // this does NOT happen with a node list. even if you delete
// // a section, the NodeList does not update itself with new
// // number of sections

// console.log(document.getElementsByClassName('btn'));
// // logs HTML collection with all elements with class name that
// // includes btn

// // Creating and inserting elements
// // .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // first child
// // header.append(message); // last child
// // message is a live element in the dom, it cannot be in two
// // places at once. we prepended then appended it. it moved
// // from being the first child to being the last child

// // we can use prepend and append not only to insert elements
// // but move elements too

// // header.append(message.cloneNode(true));
// // we can use cloneNode to duplicate the same DOM element

// header.before(message); // before the header
// header.after(message); // after the header

// // Deleting elements

// // delete cookie message on it's button click
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // remove() is very new
//     message.remove();
//     // old way of removing element
//     // message.parentElement.removeChild(message);
//     // moving up and down the dom tree is called dom traversing
//   });

// LECTURE: Styles, Attributes, and Classes

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

header.after(message); // after the header

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // remove() is very new
    message.remove();
    // old way of removing element
    // message.parentElement.removeChild(message);
    // moving up and down the dom tree is called dom traversing
  });

// Styles

// inline styles set in the DOM
message.style.backgroundColor = '#37383d';
message.style.width = '100%';

console.log(message.style.height); // does not work
console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// the second one works because we defined it as an inline
// style.

// we have to use the getComputedStyle function to grab
// styles that we didnt add in-line

console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 49px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// adds 40 px to height

console.log(getComputedStyle(message).height); // 89px

// changing CSS variables, like in :root
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes (src, class, alt.ect)
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:5500/starter/img/logo.png
console.log(logo.className); // nav__logo

// added designer attribute to img tag to test functionality
console.log(logo.designer);
// undefined, because 'designer' is not a
// standard property that is expected to be on images.

// use this method to get the attribute that is nonstandard
// instead
console.log(logo.getAttribute('designer')); // Jonas

// can also set attributes as well
logo.alt = 'Beautiful minimalist logo';

logo.setAttribute('company', 'Bankist');

// absolute URL
console.log(logo.src); // http://127.0.0.1:5500/starter/img/logo.png
// relative URL
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http://127.0.0.1:5500/starter/index.html#
console.log(link.getAttribute('href')); // #

// Data attributes
// special kind of attributes that starts with 'data'

console.log(logo.dataset.versionNumber); // 3.0
// in order to reference it, you have to transform what follows
// data with dashes to CAMEL CASE
// for example: data-version-number becomes versionNumber
// when using it in JS. dataset is used to grab the data
// attribute

// the data attributes are always stores in the dataset
// object

// Classes
logo.classList.add('c', 'd');
logo.classList.remove('c', 'd');
logo.classList.toggle('c', 'd');
logo.classList.contains('c', 'd'); // not includes

// Don't use! Can also set class.
// this will OVERWRITE all existing classes with only one class
// and will only allow us to use one class on an element
// logo.className = 'Jonas'

// LECTURE: Implementing Smooth Scrolling

// see code below modal window above

// // LECTURE: Types of Events and Event Handlers

// // an event is a signal generated by a certain dom node
// // and is a signal that something happened

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading!');
//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// // antoerh way of attaching event listener
// // old way
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading! 2');
// };

// // addEventListener is better --
// // 1.) allows us to add multiple eventListeners to the same
// // event
// // 2.) we can actually remove an eventHandler in case we dont
// // need it anymore

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // can also add eventListeners in HTML, but it is not
// // recommended, as it is pretty old school

// LECTURE: Event Propagation: Bubbling and Capturing

// events have a capturing phase and a bubbling phase

// for example:
// a click on an href link anchor tag is generated
// and starts the capturing phase at the root od the document
// or at the start of the dom tree and travels thru each parent
// element until it gets to the element that was clicked

// as soon as the event reaches the element, the target phase
// begins

// after reaching the target, the event bubbles up thru the parent
// events again and goes thru the bubbling phase

// why is this so important?
// its as if the event happened in each of the parent elements
// this means if we attach the same event listener to the
// section element, it would be handled at both the target
// element and the section element

// not all types of events have capturing and bubbling phases
// events propagate

// // LECTURE: Event Propagation in Practice

// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // true

//   // Stop propagation
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   }
//   // the nav is now the first to show up, the first one to happen
//   // when it is set to true. the other two are looking for bubbling events
//   // but this one goes first because it is capturing. the two others
//   // happen after
// );

// // target for all three event handlers is the same --
// // the nav__link, this is because of event bubbling, originating
// // form the link and bubbles up thru the dom tree. we can
// // then handle the event in all of the parent elements

// // addEventListener is only listening for events in the
// // bubbling phase, not the capturing phase
// // that is the default behavior of this method b/c the capturing
// // phase is irrelevant to us

// // if we wanted to catch events, we can define a third param
// // in addEventListener function, to true or false (the use
// // capture parameter), if set to true, the eventHandler
// // will no longer listen to bubbling events, but instead to
// // capturing events

// // capturing is rarely used nowadays and is older.

// LECTURE: Event Delegation: Implementing Page Navigation

// implemented in above code

// // LECTURE: DOM Traversing

// // walking thru the dom = selecting an element based on
// // another element. sometimes we need to select, direct child,
// // or direct parent element, or we dont know the structure of
// // the DOM at runtime.

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// // logs NodeList(2) [span.highlight, span.highlight]
// console.log(h1.childNodes);
// // logs NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]0: text1: comment2: text3: span.highlight4: text5: br6: text7: span.highlight8: textlength: 9__proto__: NodeList
// console.log(h1.children);
// // logs HTMLCollection(3) [span.highlight, br, span.highlight]0: span.highlight1: br2: span.highlightlength: 3__proto__: HTMLCollection

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary';
// // we will use this one a lot with event delegation

// h1.closest('h1').style.background = 'var(--gradient-primary';

// // Going sideways: siblings
// console.log(h1.previousElementSibling); // null
// console.log(h1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

// console.log(h1.previousSibling); // #text
// console.log(h1.nextSibling); // #text

// console.log(h1.parentElement.children); // HTML collection
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(.5)';
// });

// LECTURE: Building a Tabbed Component

// built in above code. tabs now work

// LECTURE: Passing Arguments to Event Handlers

// built in above code. navbar now fades on every other item
// when one item is being mouseovered

// LECTURE: Implementing a Sticky Navigation: The Scroll Event

// sticky nav bar -- sets position to fixed at certain
// scroll point

// console logging scroll event logged a whole bunch of
// events on even the slightest
// scroll, it is recommended to avoid using the scroll
// event listener, not efficient. should be avoided

// v1 code added to website up above, not ideal though
// because it uses scroll event listener

// // LECTURE: A Better Way: The Intersection Observer API

// // what is the intersection observer API and why is it
// // so helpful?

// // it allows our code to observe changes to the way that a
// // certain target element intersects another element,
// // or the way it intersects the viewport

// // how it works --

// // start by creating a new intersection observer
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   // needs a root property
//   // root is the element that the target is intersecting
//   root: null,
//   // threshold: 0.1, // 10%
//   threshold: [0, 0.2],
//   // 0 means cb will trigger when target element is totally
//   // out of view and as a soon as it enters the view.

//   // you can have mulitple thresholds in array
//   // percentage of intersection at which the callback
//   // will be called
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

// // whenever the target is intersecting the viewport at 10%,
// // the obsCallback function will be called with two argument
// // entries and the observer object itself

// LECTURE: Revealing Elements on Scroll

// code added above

// LECTURE: Lazy Loading Images

// add in code above, called the same as the lecture title

// LECTURE: Building a Slider Component: Part 1

// built slider without bottom circle buttons
// added code above

// LECTURE: Building a Slider Component: Part 2

// slider completed

// LECTURE: Lifecycle DOM Events

// events that occur in the dom during a page's lifecycle
// DOMContentLoaded == fired as soon as the HTML is completed
// parsed and converted to the DOM tree
// all scripts must be downloaded  and executed before the
// DOMContentLoaded can happen
// does not wait for images or external resources

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// we can use this to execute our code only after the DOM is
// ready, but we dont need to do wrap all of our code into
// the eventlistener

// addings scripts at end of html means
// that we don't have to listen to DOMContentLoaded event

// load event
// load event is fired by the window as soon as not only html is
// parsed, but all images and external resources like css files
// are loaded

window.addEventListener('load', function (e) {
  console.log('Page fully loaded!', e);
});

// beforeunload event
// created immediately before a user is about to leave the page
// so, for example, after clicking the close button in the browser
// tab

// can use this event to ask users if they are 100% they want
// to leave the page. in some browsers we have to use
// e.preventDefault();, in chrome its not necessary.

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});

// only time to prompt user is when user is in middle of filling
// out form, or making blog post. take not to not abuse this

// LECTURE: Efficient Script Loading: defer and async attributes

// we have always used the regular way up to this point
// async or defer attribute will influence file is fetched
// and executed

// we can write script tag in the head or at the end of
// the body

// HEAD

// without any attribute in the head --> will parse HTML, pause
// will find the script, fetch it, execute, and
// then finish parsing the HTML

// never include the script in the heading, so that all of
// the HTML is parsed when it reaches the script tag.

// placing the script at the body end, all of the HTML is parsed
// and the script fetching and execution is done at the end,
// but it is not perfect. the script could have been downloaded
// during the HTML parsing

// using async, the script is fetched and executed at the
// same time, but the HTML code still has to wait. still
// makes page loading time shorter

// using defer, loading time is similar to async, with defer,
// the HTML parsing is never interrupted and the execution is
// done at the end of HTML parsing

// this only applies for scripts included in the head

// those at the body end are loaded and executed at the end
//  of the HTML parsing anyway

// Regular vs. Async vs. Defer

// END OF BODY //

// Scripts are fetched and executed AFTER the HTML is completely
// parsed

// Use if you NEED TO support OLD BROWSERS, as async and defer
// are only in modern browsers.

// ASYNC IN HEAD //

// Scripts are fetched asynchronously and executed immediately

// Usually, the DOMContentLoaded event waits for ALL scripts to
// execute, except for async scripts. So, DOMContentLoaded does
// NOT wait for an async script

// Scripts NOT guaranteed to execute in order

// DEFER IN HEAD //

// Scripts are fetched asynchronously and executed AFTER the
// HTML is completely parsed

// DOMContentLoaded event fires AFTER defer script is executed

// Scripts are executed IN ORDER

////// BEST SOLUTION = DEFER IN HEAD
// This is overall the best soultion! User for your own scripts
// and when order matters (e.g. including a library)
/////

// For any code that your OWN code will not interact with,
// such as analytics like Google Analytics or ad scripts,
// you should use async.

// You can use different loading strategies for different scripts
//
