import encryptedNotes from '@/assets/encrypted_notes.json'
import { wait, decrypt, encrypt } from '@/assets/mockEncryption'
import clonedeep from 'lodash.clonedeep'

// MOCK REQUEST TIME
const endOfAPIRequest = async (data) => {
  await wait(500)
  return data
}

// IMPLEMENT A CRUD API
//  CREATE
const createNote = async (note) => {
  let encrypted = await encrypt(note)
  let apiresult = await endOfAPIRequest(clonedeep(encrypted))
  apiresult.id = encryptedNotes.data.length + 1
  return apiresult
}

// READ
// GET DATA MODEL FROM API
const getNoteModel = () => {
  return {id: null, title: '', encrypted: {content: ''}}
}

// READ
// GET ALL NOTES FROM API
const getAllNotes = async () => {
  return endOfAPIRequest(encryptedNotes.data)
}

// READ
// I DIDN'T KNOW HOW TO MOCK IT SO I SUPPOSED IT COMES FROM API
const getDecryptedNoteById = async (id) => {
  let decrypted = await decrypt(encryptedNotes.data.find(n => n.id === id) || null)
  return clonedeep(decrypted)
}

// UPDATE
// UPDATE A STORED NOTE
const updateNoteById = async (note) => {
  let encrypted = await encrypt(note)
  return endOfAPIRequest(clonedeep(encrypted))
}

// DELETE
// DELETE A STORED NOTE
const deleteNoteById = async (id) => {
  return endOfAPIRequest()
}

export { getAllNotes, getDecryptedNoteById, getNoteModel, createNote, updateNoteById, deleteNoteById }
