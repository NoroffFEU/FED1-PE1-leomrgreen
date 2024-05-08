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
      alert('Successfully logged in!')
      window.location.href = '../'
    } else {loginInfo.textContent = 'Invalid email or password'};
  });
});


function getSession() {
  const session = JSON.parse(localStorage.getItem("session"));
  return session;
}

function createSession(accessToken) {
  const session = localStorage.getItem("session");
  if (!session) {
    localStorage.setItem("session", JSON.stringify(accessToken));
    localStorage.setItem("isUserLoggedIn", true);
  }
}

//Blogpostguy88