const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});