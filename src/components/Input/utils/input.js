export function activateInput(input) {
  const parent = input.parentElement
  const label = parent.querySelector('label')

  label.classList.add('active')
  input.classList.remove('error')
}
