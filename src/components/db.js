import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  url: '++id, direccion', // Primary key and indexed props
});