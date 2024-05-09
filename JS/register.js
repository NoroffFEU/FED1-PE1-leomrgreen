document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById('submitButton');

  submitButton.addEventListener('click', function() {
      const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.data);
      alert('Account was successfully registered!')
      window.location.href = './login.html'
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting form: ' + error);
    });
  });
});




