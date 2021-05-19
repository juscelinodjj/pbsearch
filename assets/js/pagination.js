'use strict';

const wrapperPagination = document.querySelector('.wrapper-pagination');

const resetPagination = () => wrapperPagination.innerHTML = '';

const getMarkupPagination = function () {
  if (books.length <= amountBookPerPage) {
    return '';
  }
  if (currentPage === 1) {
    return `
      <span class="span-pagination">${currentPage} - ${numberOfPages}</span>
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
      <span class="span-pagination">${currentPage} - ${numberOfPages}</span>
    `;
  }
  return `
    <a class="button-previus-page" title="Página anterior">
      <i class="icon-angle-double-left"></i>
    </a>
    <span class="span-pagination">${currentPage} - ${numberOfPages}</span>
    <a class="button-next-page" title="Página seguinte">
      <i class="icon-angle-double-right"></i>
    </a>
  `;
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
    const buttonNextPage  = document.querySelector('.button-next-page');
    if (buttonPreviousPage) {
      buttonPreviousPage.addEventListener('click', navigation);
    }
    if (buttonNextPage) {
      buttonNextPage.addEventListener('click', navigation);
    }
  }
};