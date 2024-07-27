import { openDB } from 'idb';

const objectStoreName = 'jate'

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(objectStoreName)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1)

  const readWriteDb = await db.transaction(objectStoreName, 'readwrite')

  const store = await readWriteDb.objectStore(objectStoreName)

  const result = await store.put(content)
  return result
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1)

  const readDb = await db.transaction(objectStoreName, 'readonly')

  const store = await readDb.objectStore(objectStoreName)

  const result = await store.getAll()
  return result
}



initdb();