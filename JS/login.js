import { loadingScreen } from "./loader.mjs";

const loginForm = document.getElementById('loginForm');
const loginInfo = document.getElementById('loginInfo');

loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value
  };

  try {
    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (data && data.data && data.data.accessToken) {
      createSession(data.data.accessToken);
      alert('Successfully logged in!')
      loadingScreen();
      setTimeout(() => {
        window.location.href = '../';
      }, 1000);
    } else {
      loginInfo.textContent = 'Invalid email or password';
    }
  } catch (error) {
    console.error('Error:', error);
    loginInfo.textContent = 'An error occurred. Please try again.';
    loginInfo.style.color = 'red';
  }
});

function createSession(accessToken) {
  const session = localStorage.getItem("session");
  if (!session) {
    localStorage.setItem("session", JSON.stringify(accessToken));
    localStorage.setItem("isUserLoggedIn", true);
  }
}
