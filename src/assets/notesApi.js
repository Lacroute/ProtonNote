import encryptedNotes from '@/assets/encrypted_notes.json'
import { wait, decrypt, encrypt } from '@/assets/mockEncryption'

// MOCK REQUEST TIME
const endOfAPIRequest = async (data) => {
  await wait(500)
  return data
}

// GET DATA MODEL FROM API
const createEmptyNote = () => {
  const maxId = encryptedNotes.data.reduce(
    (max, n) => (n.id > max ? n.id : max),
    encryptedNotes.data[0].id
  )
  return {id: maxId + 1, title: '', encrypted: {content: ''}}
}

//  CREATE
const createNote = async (note) => {
  let encrypted = await encrypt(note)
  return endOfAPIRequest(encrypted)
}

// READ
const getAllNotes = async () => {
  return endOfAPIRequest(encryptedNotes.data)
}

// READ
const getDecryptedNoteById = async (id) => {
  return decrypt(encryptedNotes.data.find(n => n.id === id) || null)
}

// UPDATE
const updateNote = async (note) => {
  let encrypted = await encrypt(note)
  return endOfAPIRequest(encrypted)
}

export { getAllNotes, getDecryptedNoteById, createEmptyNote, createNote, updateNote }
