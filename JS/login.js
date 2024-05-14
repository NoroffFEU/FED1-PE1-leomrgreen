import { loadingScreen } from "./loader.mjs";

const loginButton = document.getElementById('loginButton');
const loginInfo = document.getElementById('loginInfo');

loginButton.addEventListener('click', function() {
  const formData = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value
  };

  fetch('https://v2.api.noroff.dev/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    data = data.data;
    if (data && data.accessToken) {
      createSession(data.accessToken);
      loadingScreen();
      setTimeout(() => {
      // alert('Successfully logged in!')
      window.location.href = '../'
      }, 1000);
    } else {loginInfo.textContent = 'Invalid email or password'};
  });
});

function createSession(accessToken) {
  const session = localStorage.getItem("session");
  if (!session) {
    localStorage.setItem("session", JSON.stringify(accessToken));
    localStorage.setItem("isUserLoggedIn", true);
  }
}

//Blogpostguy88