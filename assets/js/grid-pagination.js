'use strict';

const resetPagination = () => {
  const wrapperPagination = document.querySelector('.wrapper-pagination');
  wrapperPagination.innerHTML = '';
};

const getMarkupOption = function () {
  let loop = numberOfPages;
  let index = 1;
  let markup = '';
  while (loop) {
    markup += index === currentPage
      ? `<option value="${index}" selected>${index} - ${numberOfPages}</option>`
      : `<option value="${index}">${index} - ${numberOfPages}</option>`;
    index ++;
    loop --;
  }
  return markup;
};

const getMarkupPagination = function () {
  const filtedBooks = filterBooksByType(books);
  if (filtedBooks.length <= amountBookPerPage) {
    return '';
  }
  const markupOption = getMarkupOption();
  const disableButtonLeft = currentPage === 1 ? 'disabled' : '';
  const disableButtonRight = currentPage === numberOfPages? 'disabled' : '';
  return `
    <button class="button-previus-page" ${disableButtonLeft} title="Página anterior">
      <i class="icon-angle-double-left"></i>
    </button>
    <select class="select-pagination" title="Página específica">
      ${markupOption}
    </select>
    <button class="button-next-page" ${disableButtonRight} title="Página seguinte">
      <i class="icon-angle-double-right"></i>
    </button>
  `;
};

const navigationTo = function (event) {
  const selectPagination = event.target;
  currentPage = Number(selectPagination.value);
  scrollToTop();
  setGrid(books);
};

const navigation = function (event) {
  const buttonPressed = event.currentTarget;
  buttonPressed.classList.contains('button-next-page')
    ? currentPage ++ : currentPage --;
  scrollToTop();
  setGrid(books);
};

const addPagination = function () {
  const markup = getMarkupPagination();
  const wrapperPagination = document.querySelector('.wrapper-pagination');
  wrapperPagination.innerHTML = markup;
};

const enablePagination = function () {
  addPagination();
  const buttonPreviousPage = document.querySelector('.button-previus-page');
  const selectPagination = document.querySelector('.select-pagination');
  const buttonNextPage  = document.querySelector('.button-next-page');
  buttonPreviousPage ?
    buttonPreviousPage.addEventListener('click', navigation) : null;
  selectPagination ?
    selectPagination.addEventListener('change', navigationTo) : null;
  buttonNextPage ? buttonNextPage.addEventListener('click', navigation) : null;
};