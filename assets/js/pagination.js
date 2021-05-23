'use strict';

const wrapperPagination = document.querySelector('.wrapper-pagination');

const resetPagination = () => wrapperPagination.innerHTML = '';

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
  if (books.length <= amountBookPerPage) {
    return '';
  }
  const markupOption = getMarkupOption();
  if (currentPage === 1) {
    return `
      <select class="select-pagination" title="Página específica">
        ${markupOption}
      </select>
      <a class="button-next-page" title="Página seguinte">
        <i class="icon-angle-double-right"></i>
      </a>
    `;
  }
  if (currentPage === numberOfPages) {
    return `
      <a class="button-previus-page" title="Página anterior">
        <i class="icon-angle-double-left"></i>
      </a>
      <select class="select-pagination" title="Página específica">
        ${markupOption}
      </select>
    `;
  }
  return `
    <a class="button-previus-page" title="Página anterior">
      <i class="icon-angle-double-left"></i>
    </a>
    <select class="select-pagination" title="Página específica">
      ${markupOption}
    </select>
    <a class="button-next-page" title="Página seguinte">
      <i class="icon-angle-double-right"></i>
    </a>
  `;
};

const navigationTo = function (event) {
  const selectPagination = event.target;
  currentPage = Number(selectPagination.value);
  scrollToTop();
  setGrid(books);
};

const navigation = function (event) {
  const buttonPressed = event.target.parentElement;
  buttonPressed.classList.contains('button-next-page')
    ? currentPage ++ : currentPage --;
  scrollToTop();
  setGrid(books);
};

const enablePagination = function () {
  const markup = getMarkupPagination();
  if (markup) {
    wrapperPagination.innerHTML = markup;
    const buttonPreviousPage = document.querySelector('.button-previus-page');
    const selectPagination = document.querySelector('.select-pagination');
    const buttonNextPage  = document.querySelector('.button-next-page');
    if (buttonPreviousPage) {
      buttonPreviousPage.addEventListener('click', navigation);
    }
    if (selectPagination) {
      selectPagination.addEventListener('change', navigationTo);
    }
    if (buttonNextPage) {
      buttonNextPage.addEventListener('click', navigation);
    }
  }
};