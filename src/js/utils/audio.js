export function play(audio) {
  audio.play()
}

export function pause(audio) {
  if (audio) audio.pause()
}

export function resume(audio) {
  if (audio && audio.paused) play(audio)
}

export function setVolume(volume, autio) {
  if (autio) autio.volume = volume
}
