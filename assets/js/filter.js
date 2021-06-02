'use strict';

const handleInputRadio = function () {
  currentPage = 1;
  setGrid();
  const dropdown = document.querySelector('.js-dropdown-content');
  dropdown.classList.remove('js-dropdown-content');
  setTimeout(() => {
    dropdown.classList.add('js-dropdown-content');
  }, 500);
};

(function () {
  const inputsRadio = document.querySelectorAll('.input-radio');
  for (const inputRadio of inputsRadio) {
    inputRadio.addEventListener('change', handleInputRadio);
  }
})();
