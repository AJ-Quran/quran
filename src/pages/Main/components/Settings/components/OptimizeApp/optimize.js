import { getAccount } from '../../../../../../js/account/account'
import { loadLocal, saveLocal } from '../../../../../../js/db/localStorage'

export async function optimizeApp() {
  const localData = loadLocal('quran')
  const { usernames, active: activeUsername } = localData.accounts
  const newUsernames = []

  for (let i = 0; i < usernames.length; i++) {
    const account = await getAccount(usernames[i])
    if (account) newUsernames.push(usernames[i])
  }

  localData.accounts.usernames = newUsernames

  const activeAccount = await getAccount(activeUsername)
  if (!activeAccount) {
    if (newUsernames.length > 0) localData.accounts.active = newUsernames[0]
    if (newUsernames.length === 0) localData.accounts.active = ''
  }

  saveLocal('quran', localData)
}
