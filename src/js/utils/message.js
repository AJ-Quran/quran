export const msgData = {
  time: 3.5,
}
const animTime = 0.4

document.body.style.setProperty('--msg-anim-time', `${animTime}s`)
document.body.style.setProperty(
  '--msg-show-time',
  `${msgData.time - 2 * animTime}s`
)
