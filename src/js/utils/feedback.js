import { load, save } from '../db/db'
import { loadLocal } from '../db/localStorage'

export async function send(feedbackData) {
  const username = loadLocal('quran').accounts.active
  const dbArr = (await load(`feedbacks/${username}`)) || []

  feedbackData.username = username
  dbArr.push(feedbackData)
  await save(`feedbacks/${username}`, dbArr)
}
