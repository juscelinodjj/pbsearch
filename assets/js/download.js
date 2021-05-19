'use strict';

const download = function (event) {
  const bookId = event.target.getAttribute('data-book-id');
  const url = 'https://plmcbks.amanoteam.com/download/' + bookId;
  const anchor = document.createElement('a');
  anchor.target = '_blank';
  anchor.rel = 'noopener';
  anchor.href = url;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

const enableDownload = function () {
  const covers = document.querySelectorAll('.cover');
  for (const cover of covers) {
    cover.addEventListener('click', download);
  }
};