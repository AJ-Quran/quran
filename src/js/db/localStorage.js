function saveLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function loadLocal(name) {
  if (localStorage.getItem(name)) return JSON.parse(localStorage.getItem(name))
  return false
}

function removeLocal(name) {
  localStorage.removeItem(name)
}

export { saveLocal, loadLocal, removeLocal }
