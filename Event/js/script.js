const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  //Toggle Nav
  navLinks.classList.toggle('open');
  //Animate Links
  links.forEach(link => {
    link.classList.toggle('fade');
  });
  //Hamburger Animation
  hamburger.classList.toggle('toggle');
});
