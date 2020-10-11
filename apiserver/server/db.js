const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Memory = require('lowdb/adapters/Memory');
const { dbType } = require('../common/db');

const userDBPath = 'userDB.json';
const channelDBPath = 'channelDB.json';
const newspeedDBPath = 'newspeedDB.json';

const dbConnections = {};

async function initializeUserDB() {
  const db = await low(new FileSync(userDBPath));

  db.defaults({ user: [] }).write();

  dbConnections[dbType.USER] = db;
}

async function initializeChannelDB() {
  const db = await low(new FileSync(channelDBPath));

  db.defaults({ channel: [] }).write();

  dbConnections[dbType.CHANNEL] = db;
}

async function initializeNewspeedDB() {
  const db = await low(new FileSync(newspeedDBPath));

  db.defaults({ newspeed: [] }).write();

  dbConnections[dbType.NEWSPEED] = db;
}

async function initializeSessionDB() {
  const db = await low(new Memory('sessions'));

  db.defaults({ session: [] }).write();

  dbConnections[dbType.SESSION] = db;
}

// init standalone db
async function initStandaloneDB() {
  await initializeUserDB();
  await initializeChannelDB();
  await initializeNewspeedDB();
  await initializeSessionDB();
}

function getDB(dbType) {
  if (dbConnections[dbType]) {
    return dbConnections[dbType]
  } else {
    throw new Error(`DB not initialized: ${dbType}`)
  }
}

module.exports = {
  initStandaloneDB,
  getDB,
}
