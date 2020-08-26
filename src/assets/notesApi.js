import encryptedNotes from '@/assets/encrypted_notes.json'
import { decrypt } from '@/assets/mockEncryption'

const getAllNotes = async () => {
  const notes = await decrypt(encryptedNotes)
  return notes.data
}

export { getAllNotes }
