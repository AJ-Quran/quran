export function progressPercent(value, max, min = 0) {
  return ((value - min) / (max - min)) * 100
}

export function abPercent(a, b) {
  return (a / b) * 100
}
