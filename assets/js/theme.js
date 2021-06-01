'use strict';

const setTheme = function (theme) {
  if (!theme) {
    localStorage.setItem('theme', 'light');
    theme = 'light';
  }
  const color = theme === 'light' ? '#2980b9' : '#1f1f1f';
  const metaThemeColor = document.querySelector('meta[name=theme-color]');
  metaThemeColor.setAttribute('content', color);
  const body = document.querySelector('body');
  body.setAttribute('data-theme', theme);
  const iconTheme = document.querySelector('.button-theme i');
  if (theme === 'light') {
    iconTheme.classList.add('icon-sun');
    iconTheme.classList.remove('icon-moon');
  }
  if (theme === 'dark') {
    iconTheme.classList.remove('icon-sun');
    iconTheme.classList.add('icon-moon');
  }
};

const switchTheme = function() {
  const theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  setTheme(theme);
}

const buttonTheme = document.querySelector('.button-theme');
buttonTheme.addEventListener('click', switchTheme);

setTheme(localStorage.getItem('theme'));