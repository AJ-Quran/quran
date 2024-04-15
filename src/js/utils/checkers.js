import { loadLocal, saveLocal } from '../db/localStorage'

function isValidUsername(username) {
  if (username.length < 2) {
    return { msg: 'Write more than 1 characters', ok: false }
  }

  const hasUppercase = /[A-Z]/.test(username.trim())
  if (hasUppercase) {
    return { msg: "Don't use uppercase", ok: false }
  }

  const hasWhitespace = /\s/.test(username.trim())
  if (hasWhitespace) {
    return { msg: 'Contains whitespace', ok: false }
  }

  const regex = /^[a-z0-9_]+$/
  if (!regex.test(username.trim())) {
    return { msg: 'Invalid characters', ok: false }
  }

  return { msg: 'Valid username', ok: true }
}

function isValidPassword(password) {
  if (password.length < 4) {
    return { msg: 'Write more than 3 characters', ok: false }
  }

  const hasNumbers = /\d/
  if (!hasNumbers.test(password.trim())) {
    return { msg: 'Password must contain at least one number', ok: false }
  }

  return { msg: 'Valid password', ok: true }
}

function isValidEmail(email) {
  if (!email) {
    return { msg: 'Email is required', ok: false }
  }

  const parts = email.split('@')
  if (parts.length !== 2) {
    return { msg: 'Invalid email format', ok: false }
  }

  const localPart = parts[0]
  const domainPart = parts[1]

  if (localPart.length < 1) {
    return { msg: 'Local part is missing', ok: false }
  }

  if (domainPart.length < 3 || domainPart.indexOf('.') === -1) {
    return { msg: 'Invalid domain', ok: false }
  }

  const localRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/
  if (!localRegex.test(localPart)) {
    return { msg: 'Invalid characters in local part', ok: false }
  }

  const domainRegex = /^[a-zA-Z0-9.-]+$/
  if (!domainRegex.test(domainPart)) {
    return { msg: 'Invalid characters in domain', ok: false }
  }

  return { msg: 'Valid email', ok: true }
}

function localInitialData() {
  const hasData = loadLocal('quran')

  if (!hasData) {
    const initialData = getLocalInitialData()
    saveLocal('quran', initialData)
  }
}

function getLocalInitialData() {
  const initialData = {
    accounts: {
      usernames: [],
      active: '',
    },
    quran: {
      lastRead: {},
    },
  }
  return initialData
}

export {
  isValidUsername,
  isValidPassword,
  isValidEmail,
  localInitialData,
  getLocalInitialData,
}
