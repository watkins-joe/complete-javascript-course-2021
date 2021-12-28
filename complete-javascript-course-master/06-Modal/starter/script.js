'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// const btnOpenModal = document.querySelector('.show-modal');
//limitation of querySelector method, it only selected the
//first element with the class of show-modal
//whenever we use querySelector with a class that is on
//multiple elements, only the first one will get selected.

//instead, use querySelectorAll to select all of them.
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  //just passing in name of the class to remove
  //do not add the "." to name of class.
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//removing hidden class to show modal with function
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

//adds hidden class to overlay and modal on clicks
//adds X button close functionality, hides modal and overlay
btnCloseModal.addEventListener('click', closeModal);

//adds functionality that when user clicks on overlay,
//modal box is hidden
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  //logs the keypress 'key'
  console.log(`The ${event.key} key was pressed.`);
  //if ESC key is pressed AND modal does not
  //have hidden class, close modal
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
