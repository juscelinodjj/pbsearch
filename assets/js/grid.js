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
  const {type, extension, size, duration, chapters, title, idBook} = book;
  const markupDuration = !duration
    ? '' : `Duração: <span class="bold">${duration}</span>`;
  const markupChapters = !chapters
    ? '' : `Capítulos: <span class="bold">${chapters}</span>`;
  const markupGridItem = `
    <section class="col s6 m3 l2">
      <div class="js-waiting-for-image-loading wrapper-image">
        <img data-book-id="${idBook}"
          class="js-waiting-for-image-loading card cover"
          src="${urlCover}" alt="${title}" title="${title}" loading="lazy"
          onerror="this.style.color = '#2c3e50'">
      </div>
      <div class=" wrapper-span">
        <span class="js-waiting-for-image-loading span-info">
          Tipo: <span class="bold">${type}</span>
        </span>
        <span class="js-waiting-for-image-loading span-info">
          Formato: <span class="bold">${extension}</span>
        </span>
        <span class="js-waiting-for-image-loading span-info">
          Tamanho: <span class="bold">${size}</span>
        </span>
        <span class="js-waiting-for-image-loading span-info">
          ${markupDuration}
          ${markupChapters}
        </span>
      </div>
    </section>
  `;
  return markupGridItem;
};

const showImageAndSpan = function (event) {
  const image = event.target;
  image.classList.remove('js-waiting-for-image-loading');
  const wrapperImage = image.parentElement;
  wrapperImage.classList.remove('js-waiting-for-image-loading');
  const thisCol = image.parentElement.parentElement;
  const spans = thisCol.querySelectorAll('.span-info');
  for (const span of spans) {
    span.classList.remove('js-waiting-for-image-loading');
  }
};

const imagesObserver = function() {
  const images = document.querySelectorAll('.cover');
  for (const image of images) {
    image.addEventListener('load', showImageAndSpan);
    image.addEventListener('error', showImageAndSpan);
  }
};

const filterBooksByType = function () {
  const inputsRadio = document.querySelectorAll('.input-radio');
  const type = Array.from(inputsRadio)
    .filter(element => element.checked)[0].value;
  if (type === 'Todos') {
    return books;
  }
  return books.filter(book => book['type'] === type);
};

const setGrid = function () {
  if (!books.length) {
    return;
  }
  const filtedBooks = filterBooksByType(books);
  numberOfPages = Math.ceil(filtedBooks.length / amountBookPerPage);
  showMessage(`Resultados encontrados:<span class="bold"> ${filtedBooks.length}`
    +'</span>');
  if (!numberOfPages) {
    grid.innerHTML = '';
    enablePagination();
    return;
  }
  let loop = amountBookPerPage;
  let bookIndex = currentPage * amountBookPerPage - amountBookPerPage;
  let markup = '';
  while (loop) {
    const currentBook = filtedBooks[bookIndex];
    if (currentBook) {
      markup += getMarkupGridItem(currentBook);
      bookIndex ++;
      loop --;
      continue;
    }
    break;
  }
  grid.innerHTML = markup;
  imagesObserver();
  enablePagination();
  enableDownload();
};