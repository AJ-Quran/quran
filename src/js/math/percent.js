function progressPercent(value, max, min = 0) {
  return ((value - min) / (max - min)) * 100
}

export { progressPercent }
