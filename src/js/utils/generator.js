import { random } from '../math/number'

export function strongPassword(length = 8) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = random(0, charset.length - 1)
    password += charset[randomIndex]
  }

  return password
}
