'use strict';

const input = document.querySelector('.input');
const inputIcon = document.querySelector('.icon-search');
const buttonToTop = document.querySelector('.button-to-top');
let searching = false;

const showMessage = function (message) {
  const element = document.querySelector('.span-message');
  element.innerHTML = message;
};

const toggleElementVisibility = function (elementClass, show) {
  const element = document.querySelector(`.${elementClass}`);
  const isHidden = element.classList.contains('hide');
  if (show) {
    if (isHidden) {
      element.classList.remove('hide');
    }
    return;
  }
  if (!isHidden) {
    element.classList.add('hide');
  }
};

const handleScroll = function () {
  const spaceFromTop = document.documentElement.scrollTop;
  spaceFromTop > 200
    ? toggleElementVisibility('button-to-top', true)
    : toggleElementVisibility('button-to-top', false);
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const handleSearch = function (response) {
  toggleElementVisibility('wrapper-load', false);
  const status = response['status'];
  if (status === 'offline') {
    showMessage('Verifique sua conexão com a internet e tente novamente.');
    searching = false;
    return;
  }
  if (status === 404) {
    showMessage('Nenhum resultado encontrado.');
    searching = false;
    return;
  }
  if (status === 200) {
    const books = response['books'];
    showMessage(`Resultados encontrados:<span class="bold"> ${books.length}
      </span>`);
    setGrid(books);
  }
  searching = false;
};

const search = async function () {
  if (!searching) {
    const query = encodeURI(input.value);
    if (query.length > 2) {
      searching = true;
      showMessage('');
      resetGrid();
      resetPagination();
      toggleElementVisibility('wrapper-load', true);
      const response = await request(query);
      handleSearch(response);
    }
  }
};

inputIcon.addEventListener('click', search);
input.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    inputIcon.click();
    document.activeElement.blur();
  }
});
buttonToTop.addEventListener('click', scrollToTop);
document.addEventListener('scroll', handleScroll);