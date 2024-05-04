let synth = window.speechSynthesis

export function read(text, onEndCallBack) {
  if ('speechSynthesis' in window) {
    readStop()
    const utterance = new SpeechSynthesisUtterance(text)

    utterance.addEventListener('end', onEndCallBack)
    synth.speak(utterance)
  } else {
    return {
      msg: 'Speech synthesis not supported in this browser.',
      type: 'error',
      ok: false,
    }
  }
}

export function readStop() {
  if ('speechSynthesis' in window) {
    synth.cancel()
  } else {
    return {
      msg: 'Speech synthesis not supported in this browser.',
      type: 'error',
      ok: false,
    }
  }
}
