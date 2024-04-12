function text(txt) {
  navigator.clipboard.writeText(txt)

  return { msg: 'Copied to clipboard' }
}

function elText(elRef) {
  const txt = elRef.current.textContent || elRef.current.value
  return text(txt)
}

export { text, elText }
