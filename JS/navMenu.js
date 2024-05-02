const burger = document.getElementById("burger");
const navBar = document.getElementById("navList");

burger.addEventListener("click", () => {
  navBar.classList.toggle("active");

  if (navBar.classList.contains("active")) {
    burger.className = "fa-solid fa-x";
  } else {
    burger.className = "fa-solid fa-bars";
  }
});

const drkModeButton = document.getElementById('drkModeIcon');

drkModeButton.addEventListener('click', () => {
  const darkModeElements = document.querySelectorAll('.drkMode');
  
  let isLightMode = localStorage.getItem('lightMode') === 'true';
  
  // Toggle the dark mode state
  isLightMode = !isLightMode;

  // Save the new state back to localStorage
  localStorage.setItem('lightMode', isLightMode.toString());

  darkModeElements.forEach(element => {
    element.classList.toggle('lightMode');
  });

  // Update the icon based on the current mode
  if (!isLightMode) { 
    drkModeButton.className = 'fa-regular fa-lightbulb';
  } else {
    drkModeButton.className = 'fa-regular fa-moon';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const isLightMode = localStorage.getItem('lightMode') === 'true';
  if (isLightMode) {
    const darkModeElements = document.querySelectorAll('.drkMode');
    darkModeElements.forEach(element => {
      element.classList.add('lightMode');
    });
    drkModeButton.className = 'fa-regular fa-moon';
  } else {
    drkModeButton.className = 'fa-regular fa-lightbulb';
  }
});

