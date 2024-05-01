import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import { save, load, edit as editDB, deleteData, app } from '../db/db'
import { loadLocal, saveLocal } from '../db/localStorage'
import { getLocalInitialData } from '../utils/checkers'
import { changeHref } from '../utils/href'

export async function signup(data) {
  if (!data) return { msg: 'Wrong data', ok: false }

  const user = {
    ...data.inputs,
    ...data.chosen,
  }
  const { username, password } = user

  const notFreeUsername = await load(`accounts/${username}/user`)
  if (notFreeUsername) {
    return { msg: 'Username has used', msgType: 'warning', ok: false }
  }

  await save(`accounts/${username}/user`, user)
  await login({ inputs: { username, password }, ok: true })

  changeHref()
  return { ok: true }
}

export async function deleteAccount(username) {
  await deleteData(`accounts/${username}`)
  logout(username)
}

export async function login(data) {
  if (!data.ok) return { msg: 'Wrong data', ok: false }

  const user = {
    ...data.inputs,
    ...data.chosen,
  }
  const { username, password } = user

  const localData = loadLocal('quran')
  if (localData.accounts.usernames.includes(username)) {
    return { msg: 'You have already logged in', msgType: 'success', ok: false }
  }

  const account = await load(`accounts/${username.trim()}/user`)

  if (!account) {
    return {
      msg: 'There is no account with this username',
      msgType: 'warning',
      ok: false,
    }
  }

  if (account.password !== password) {
    return { msg: 'Wrong password', msgType: 'warning', ok: false }
  }

  localData.accounts.usernames = [...localData.accounts.usernames, username]
  if (!localData.accounts.active) localData.accounts.active = username

  saveLocal('quran', localData)

  changeHref()
  return { ok: true }
}

export function logout(username) {
  const localData = loadLocal('quran')

  const usernames = localData.accounts.usernames.filter(
    (item) => item !== username
  )

  if (usernames.length !== 0) {
    localData.accounts.usernames = usernames
    localData.accounts.active = usernames[0]

    saveLocal('quran', localData)
    window.location.reload()
    return false
  }

  saveLocal('quran', getLocalInitialData())
  changeHref('account/login')
  return true
}

export async function editUser(username, newData) {
  if (!newData.ok) return { msg: 'Wrong data', ok: false }

  const user = {
    ...newData.inputs,
    ...newData.chosen,
    img: { ...newData.img },
  }

  if (!user.img.img) {
    await deleteData(`accounts/${username}/user/img`)
    delete user.img
  }

  const localUsername = loadLocal('quran').accounts.active

  if (localUsername === user.username) {
    await editDB(`accounts/${username}/user`, user)
    return { msg: `User's data has changed`, msgType: 'success', ok: true }
  }

  const notFreeUsername = await load(`accounts/${user.username}/user`)
  if (notFreeUsername) {
    return { msg: 'Username has used', msgType: 'warning', ok: false }
  }

  const localData = loadLocal('quran')
  const usernames = localData.accounts.usernames

  for (let i = 0; i < usernames.length; i++) {
    if (usernames[i] === localUsername) {
      usernames[i] = user.username
      localData.accounts.active = user.username
      break
    }
  }
  saveLocal('quran', localData)

  const dbUser = await load(`accounts/${localUsername}`)
  user.password = dbUser.user.password
  dbUser.user = user

  await save(`accounts/${user.username}`, dbUser)
  await deleteData(`accounts/${localUsername}`)

  return { msg: `User's data has changed`, msgType: 'success', ok: true }
}

export async function getAccount(username) {
  const account = await load(`accounts/${username}/user`)
  if (!account) return null

  return account
}

export async function changeAccount(username) {
  const localData = loadLocal('quran')
  if (localData.accounts.usernames.includes(username))
    localData.accounts.active = username

  const account = await load(`accounts/${username}`)

  localData.quran.lastRead =
    account.quran?.lastRead || getLocalInitialData().quran.lastRead

  saveLocal('quran', localData)
  window.location.reload()
}

export async function googleAuth() {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const { user } = await signInWithPopup(auth, provider)
  const username = user.email.split('@')[0]

  const localData = loadLocal('quran')
  if (localData.accounts.usernames.includes(username)) {
    return { msg: 'You have already logged in', msgType: 'success', ok: false }
  }

  const hasAccount = await load(`accounts/${username}`)

  if (hasAccount) {
    localData.accounts.usernames = [...localData.accounts.usernames, username]
  }

  if (!hasAccount) {
    const newUser = {
      name: user.displayName,
      username,
      gender: 'male',
      img: {
        img: user.photoURL,
      },
      password: false,
    }

    await save(`accounts/${username}/user`, newUser)

    localData.accounts.usernames = [...localData.accounts.usernames, username]
    if (!localData.accounts.active) localData.accounts.active = username
  }

  saveLocal('quran', localData)
  changeHref()
  return { ok: true }
}
