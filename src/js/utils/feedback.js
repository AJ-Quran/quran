import { load, save } from '../db/db'
import { loadLocal } from '../db/localStorage'

export async function sendFeedback(feedbackData) {
  const username = loadLocal('quran').accounts.active
  const dbArr = (await load(`feedbacks/${username}`)) || []

  if (!feedbackData.name) delete feedbackData.name
  if (!feedbackData.email) delete feedbackData.email

  feedbackData.username = username
  dbArr.push(feedbackData)
  await save(`feedbacks/${username}`, dbArr)
}
