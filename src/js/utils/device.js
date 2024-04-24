export function deviceIsPhone() {
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return mobileRegex.test(navigator.userAgent)
}
