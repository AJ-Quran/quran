export function saveLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

export function loadLocal(name) {
  if (localStorage.getItem(name)) return JSON.parse(localStorage.getItem(name))
  return false
}

export function removeLocal(name) {
  localStorage.removeItem(name)
}
