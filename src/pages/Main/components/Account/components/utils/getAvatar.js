import { load } from '../../../../../../js/db/db'
import { loadLocal } from '../../../../../../js/db/localStorage'

const avatars = new Map()
export { avatars }

export async function getAvatar(username) {
  username = username ? username : loadLocal('quran').accounts.active
  if (avatars.get(username)) return avatars.get(username)

  const img = await load(`accounts/${username}/user/img/img`)
  const name = await load(`accounts/${username}/user/name`)

  const avatar = { name: name[0], img }

  avatars.set(username, avatar)
  return avatar
}
