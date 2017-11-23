async function register (name, email, password) {
  let res = await window.fetch('http://localhost:5000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
  let resAsJson = await res.json()
  return resAsJson
}

async function login (email, password) {
  let res = await window.fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  let resAsJson = await res.json()
  return resAsJson
}

async function getYearData (year) {
  let res = await window.fetch('http://localhost:5000/plan/' + year, {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + window.localStorage.getItem('authToken')
    }
  })
  let resAsJson = await res.json()
  return resAsJson
}

async function getMonthData (year, month) {
  let res = await window.fetch('http://localhost:5000/plan/' + year + '/' + month, {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + window.localStorage.getItem('authToken')
    }
  })
  let resAsJson = await res.json()
  return resAsJson
}

async function addExpencive (year, month, data) {
  let res = await window.fetch('http://localhost:5000/plan/' + year + '/' + month + '/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + window.localStorage.getItem('authToken')
    },
    body: JSON.stringify(data)
  })
  let resAsJson = await res.json()
  return resAsJson
}

async function deleteExpencive (id) {
  let res = await window.fetch('http://localhost:5000/plan/expense/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + window.localStorage.getItem('authToken')
    }
  })
  let resAsJson = await res.json()
  return resAsJson
}

async function updateMonthlyData (year, month, data) {
  let res = await window.fetch('http://localhost:5000/plan/' + year + '/' + month, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + window.localStorage.getItem('authToken')
    },
    body: JSON.stringify(data)
  })
  let resAsJson = await res.json()
  return resAsJson
}

export { register, login, getYearData, getMonthData, addExpencive, deleteExpencive, updateMonthlyData }
