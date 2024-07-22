import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
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

  const readWriteDb = await db.transaction(objectStoreNames, 'readwrite')

  const store = await readWriteDb.objectStore(objectStoreNames)

  const result = await store.put(content)
  return result
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1)

  const readDb = await db.transaction(objectStoreNames, 'readonly')

  const store = await readDb.objectStore(objectStoreNames)

  const result = await store.getAll()
  return result
}



initdb();