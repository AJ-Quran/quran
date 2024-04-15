function progressPercent(value, max, min = 0) {
  return ((value - min) / (max - min)) * 100
}

function abPercent(a, b) {
  return (a / b) * 100
}

export { progressPercent, abPercent }
