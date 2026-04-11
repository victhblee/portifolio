const typingText = document.querySelector('.typing-text span');
const words = ['Desenvolvedor Web', 'Programador', 'Desenvolvedor Frontend', 'Criador de Sites'];
const typingSpeed = 120;
const deletingSpeed = 70;
const pauseAfterTyping = 1200;
let currentWord = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const word = words[currentWord];

  if (isDeleting) {
    characterIndex--;
    typingText.textContent = word.substring(0, characterIndex);
  } else {
    characterIndex++;
    typingText.textContent = word.substring(0, characterIndex);
  }

  if (!isDeleting && characterIndex === word.length) {
    isDeleting = true;
    setTimeout(typeEffect, pauseAfterTyping);
  } else if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    currentWord = (currentWord + 1) % words.length;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }
}

function setActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav ul li a');

  function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`header nav ul li a[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        link?.classList.add('ativo');
      } else {
        link?.classList.remove('ativo');
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('ativo'));
      link.classList.add('ativo');
    });
  });

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

document.addEventListener('DOMContentLoaded', () => {
  if (typingText) {
    typeEffect();
  }
  setActiveNav();
});

