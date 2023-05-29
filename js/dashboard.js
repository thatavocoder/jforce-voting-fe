const baseUrl = 'http://localhost:8080/'
const candidatesUrl = baseUrl + 'api/admin/dashboard/'

const token = localStorage.getItem('token')

window.onload = function () {
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html'
    return
  }
  else if (localStorage.getItem('token') && localStorage.getItem('userType') !== 'ADMIN') {
    window.location.href = 'login.html'
    return
  }
  else {
    fetch(candidatesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          const candidates = res.data
          const candidateList = document.getElementById('candidate-list')
          candidates.forEach(candidate => {
            const li = document.createElement('li')
            li.innerHTML = candidate.name + ":"
            li.className = 'list-item'
            const span = document.createElement('span')
            span.innerHTML = candidate.voteCount
            li.appendChild(span)
            candidateList.appendChild(li)
          })
        } else {
          alert(res.message)
        }
      }
      )
  }
}