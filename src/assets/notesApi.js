import encryptedNotes from '@/assets/encrypted_notes.json'
import { wait, decrypt } from '@/assets/mockEncryption'

const getAllNotes = async () => {
  await wait(500)
  return encryptedNotes.data
}

const getDecryptedNoteById = async (id) => {
  return decrypt(encryptedNotes.data.find(n => n.id === id) || null)
}

export { getAllNotes, getDecryptedNoteById }
