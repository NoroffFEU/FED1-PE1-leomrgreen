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
  let isDarkMode = document.body.classList.contains('drkModeTrigger'); 
  const bgBody = document.querySelectorAll('body'); 
  
  // Toggle dark mode class on all elements
  darkModeElements.forEach(element => {
    element.classList.toggle('drkModeTrigger');
  });
  
  if (!isDarkMode) {
    drkModeButton.className = 'fa-regular fa-moon';  
  } else {
    drkModeButton.className = 'fa-regular fa-lightbulb'; 
  }

});
