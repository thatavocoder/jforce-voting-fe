const baseUrl = 'http://localhost:8080/'
const loginUrl = baseUrl + 'api/auth/login/'

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const data = { username, password }
  fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        localStorage.setItem('token', res.JWT_TOKEN)
        localStorage.setItem('userType', res.data.userType)
        if (res.data.userType === 'ADMIN') {
          window.location.href = 'dashboard.html'
        } else if (res.data.userType === 'USER') {
          window.location.href = 'voting.html'
        }
      } else {
        alert(res.message)
      }
    })
    .catch(err => console.log(err))
})