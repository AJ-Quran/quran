export function floor(num) {
  return Math.floor(num)
}

export function ceil(num) {
  return Math.ceil(num)
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
