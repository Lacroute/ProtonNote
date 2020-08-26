import encryptedNotes from '@/assets/encrypted_notes.json'
import { wait, decrypt } from '@/assets/mockEncryption'

const getAllNotes = async () => {
  await wait(500)
  return encryptedNotes.data
}

const getDecryptedNoteById = async (id) => {
  return decrypt(encryptedNotes.data.find(n => n.id === id) || null)
}

const createEmptyNote = () => {
  const maxId = encryptedNotes.data.reduce(
    (max, n) => (n.id > max ? n.id : max),
    encryptedNotes.data[0].id
  )
  return {id: maxId + 1, title: '', encrypted: {content: ''}}
}

export { getAllNotes, getDecryptedNoteById, createEmptyNote }
