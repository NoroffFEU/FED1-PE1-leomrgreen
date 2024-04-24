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
      window.location.href = '/'
    } else {loginInfo.textContent = 'Invalid email or password'};
  });
});


function getSession() {
  const session = JSON.parse(sessionStorage.getItem("session"));
  return session;
}

function createSession(accessToken) {
  const session = sessionStorage.getItem("session");
  if (!session) {
    sessionStorage.setItem("session", JSON.stringify(accessToken));
  }
}

//Blogpostguy88