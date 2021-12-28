'use strict';

const textArea = document.querySelector('textArea');
const convertButton = document.querySelector('button');

let camelVars = [];

convertButton.addEventListener('click', function () {
  let underscoreVars = textArea.value.split('\n');
  for (let i = 0; i < underscoreVars.length; i++) {
    camelVars[i] = underscoreVars[i].toLowerCase().trim();
    let [firstHalf, secondHalf] = camelVars[i].split('_');
    let secondHalfFirstLetter = secondHalf[0].toUpperCase();
    camelVars[i] = [
      `${firstHalf}${secondHalfFirstLetter}${secondHalf.slice(1)}`,
    ].join();
  }
  console.log(camelVars);
});

// (C) Joe Watkins 2021
