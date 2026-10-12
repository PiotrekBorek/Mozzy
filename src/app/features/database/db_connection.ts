import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('mozzy.db');

db.execSync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
`);