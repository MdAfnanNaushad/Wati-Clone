// Mobile Menu Toggle
const menu = document.querySelector('.nav__menu');

document.querySelector('.nav__logo').addEventListener('click', () => {
  menu.classList.toggle('active');
});