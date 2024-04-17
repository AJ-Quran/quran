import { isValidUsername, isValidPassword, isValidEmail } from './checkers'

export function getData(form) {
  const allHaveValue = checkValues(form)
  if (!allHaveValue.ok) {
    allHaveValue.input.classList.add('error')
    allHaveValue.input.focus()

    return allHaveValue
  }

  const { values } = allHaveValue

  const chosen = checkChooseArea(form)

  return { inputs: values, chosen, ok: true }
}

function checkValues(form) {
  const inputs = [
    ...form.querySelectorAll('input:not([type="file"])'),
    ...form.querySelectorAll('textarea'),
  ]
  const values = {}

  for (let input of inputs) {
    const value = input.value.trim()
    if (!value) return { input, msg: 'Write something', ok: false }
    const label = input.parentElement
      .querySelector('label')
      .textContent.toLowerCase()

    const checkedValue = checkValue(value, label)
    if (!checkedValue.ok) {
      return { input, msg: checkedValue.msg, ok: false }
    }
    values[label] = value
  }

  return { values, ok: true }
}

function checkValue(value, label) {
  if (label === 'username') {
    return isValidUsername(value)
  }
  if (label === 'password') {
    return isValidPassword(value)
  }
  if (label === 'email') {
    return isValidEmail(value)
  }
  return { ok: true }
}

function checkChooseArea(form) {
  const chooseArea = form.querySelector('.choose_area')
  if (!chooseArea) return false

  const chosenI = +chooseArea.querySelector('.chosen').getAttribute('index')
  const option = form.querySelectorAll('[option]')[chosenI]

  const label = chooseArea.getAttribute('label').toLowerCase()

  let res = {}
  res[label] = option.getAttribute('option').toLowerCase()

  return res
}
