import Dexie from 'dexie';

const db = new Dexie('MouseSupplements');

db.version(1).stores({
  supplements: '++id, name, dose, notes',
  logs: '++id, date, supplementId, taken'
});

export default db;