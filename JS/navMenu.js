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
