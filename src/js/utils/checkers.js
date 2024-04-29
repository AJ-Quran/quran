import { loadLocal, saveLocal } from '../db/localStorage'

export function isValidUsername(username) {
  if (username.length < 2) {
    return { msg: 'Write more than 1 characters', ok: false }
  }

  const hasWhitespace = /\s/.test(username.trim())
  if (hasWhitespace) {
    return { msg: 'Contains whitespace', ok: false }
  }

  const regex = /^[A-Za-z0-9_]+$/
  if (!regex.test(username.trim())) {
    return { msg: 'Invalid characters', ok: false }
  }

  return { msg: 'Valid username', ok: true }
}

export function isValidPassword(password) {
  if (password.length < 4) {
    return { msg: 'Write more than 3 characters', ok: false }
  }

  const hasNumbers = /\d/
  if (!hasNumbers.test(password.trim())) {
    return { msg: 'Password must contain at least one number', ok: false }
  }

  return { msg: 'Valid password', ok: true }
}

export function isValidEmail(email) {
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

export function localInitialData() {
  const hasData = loadLocal('quran')

  if (!hasData) {
    const initialData = getLocalInitialData()
    saveLocal('quran', initialData)
  }
}

export function getLocalInitialData() {
  const initialData = {
    accounts: {
      usernames: [],
      active: '',
    },
    quran: {
      lastRead: {
        ayah: 0,
        surah: 1,
      },
    },
    settings: {
      theme: 'auto',
    },
  }
  return initialData
}
