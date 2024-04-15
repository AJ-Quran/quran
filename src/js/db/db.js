import { API } from '../../api/api'

import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  child,
  set,
  get,
  update,
  remove,
} from 'firebase/database'

const app = initializeApp(API.firebase)
const db = getDatabase()

async function save(path, data) {
  try {
    await set(ref(db, path), data)
    return true
  } catch (err) {
    return err
  }
}

async function load(path) {
  try {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, path))

    if (snapshot.exists()) {
      return snapshot.val()
    }
    return false
  } catch (err) {
    return err
  }
}

async function edit(path, newData) {
  try {
    const snapshot = await load(path)

    if (snapshot) {
      await update(ref(db, path), newData)
      return true
    }
    return false
  } catch (err) {
    return err
  }
}

async function deleteData(path) {
  try {
    const snapshot = await load(path)

    if (snapshot) {
      await remove(ref(db, path))
      return true
    }
    return false
  } catch (err) {
    return err
  }
}

async function saveOrEdit(path, data) {
  const d = await load(path)

  if (!d) await save(path, data)
  if (d) await edit(path, data)
}

export { save, load, edit, deleteData, saveOrEdit }
