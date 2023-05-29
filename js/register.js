const baseUrl = 'http://localhost:8080/'
const registerUrl = baseUrl + 'api/auth/register/'

document.getElementById('register-form').addEventListener('submit', function (e) {
  console.log('register form submitted');
  e.preventDefault()
  const username = document.getElementById('register-username').value
  const password = document.getElementById('register-password').value
  const email = document.getElementById('register-email').value
  const phoneNo = document.getElementById('register-phone').value
  const data = { username, password, email, phoneNo }
  console.log(data);
  fetch(registerUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        window.location.href = 'login.html'
      } else {
        alert(res.message)
      }
    })
    .catch(err => console.log(err))
})