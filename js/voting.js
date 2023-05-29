const baseUrl = 'http://localhost:8080/'
const candidatesUrl = baseUrl + 'api/candidate/list'

const token = localStorage.getItem('token')

window.onload = function () {
  console.log('voting page loaded');
  if (!token) {
    window.location.href = 'login.html'
    return
  }
  if (localStorage.getItem('userType') !== 'USER') {
    window.location.href = 'login.html'
    return
  }

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
          const label = document.createElement('label')
          label.className = 'radio'
          const input = document.createElement('input')
          input.type = 'radio'
          input.name = 'vote'
          input.value = candidate.id
          label.appendChild(input)
          const p = document.createElement('p')
          p.innerHTML = candidate.name
          p.className = 'label'
          label.appendChild(p)
          candidateList.appendChild(label)
        })
      } else {
        alert(res.message)
      }
    })
}

document.getElementById('voting-form').addEventListener('submit', function (e) {
  e.preventDefault()
  const candidateId = document.querySelector('input[name="vote"]:checked').value
  const votingUrl = baseUrl + `api/vote/${candidateId}`
  fetch(votingUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        alert(res.message)
        window.location.href = 'voting.html'
      } else {
        alert(res.message)
      }
    })
    .catch(err => console.log(err))
})