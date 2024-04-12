function play(audio) {
  audio.play()
}

function pause(audio) {
  if (audio) audio.pause()
}

function resume(audio) {
  if (audio && audio.paused) play(audio)
}

function setVolume(volume, autio) {
  if (autio) autio.volume = volume
}

export { play, pause, resume, setVolume }
