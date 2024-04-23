const loginButton = document.getElementById('loginButton');

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
    console.log(data.data);
    console.log('hello ' + data.data.name + 'youre currently logged in as an administrator, please refer to ' + data.data.accessToken + ' when making any changes');
  });
});