'use strict';

const grid = document.querySelector('.grid');
const amountBookPerPage = 12;
let books = [];
let currentPage = 1;
let numberOfPages = 0;

const resetGrid = function () {
  books = [];
  currentPage = 1;
  numberOfPages = 0;
  grid.innerHTML = '';
};

const getMarkupGridItem = function (book) {
  const urlCover = 'https://plmcbks.amanoteam.com/view/' + book['idCover'];
  const {type} = book;
  const {extension} = book;
  const {size} = book;
  const {duration} = book;
  const {chapters} = book;
  const {title} = book;
  const {idBook} = book;
  const markupDuration = !duration
    ? '' : `Duração: <span class="bold">${duration}</span>`;
  const markupChapters = !chapters
    ? '' : `Capítulos: <span class="bold">${chapters}</span>`;
  const markupGridItem = `
    <section class="col s6 m3 l2">
      <div class="wrapper-image">
        <img data-book-id="${idBook}" class="cover" src="${urlCover}"
          alt="${title}" title="${title}" loading="lazy"
          onerror="this.style.color = '#2c3e50'">
      </div>
      <div class="wrapper-span">
        <span class="span-info">
          Tipo: <span class="bold">${type}</span>
        </span>
        <span class="span-info">
          Formato: <span class="bold">${extension}</span>
        </span>
        <span class="span-info">
          Tamanho: <span class="bold">${size}</span>
        </span>
        <span class="span-info">
          ${markupDuration}
          ${markupChapters}
        </span>
      </div>
    </section>
  `;
  return markupGridItem;
};

const setGrid = function (array) {
  if (!books.length) {
    books = array;
    numberOfPages = Math.ceil(books.length / amountBookPerPage);
  }
  let loop = amountBookPerPage;
  let bookIndex = currentPage * amountBookPerPage - amountBookPerPage;
  let markup = '';
  while (loop) {
    const currentBook = books[bookIndex];
    if (currentBook) {
      markup += getMarkupGridItem(currentBook);
      bookIndex ++;
      loop --;
      continue;
    }
    break;
  }
  grid.innerHTML = markup;
  enablePagination();
  enableDownload();
};