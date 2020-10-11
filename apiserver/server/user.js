const _ = require('lodash');
const crypto = require('crypto');
const { getDB } = require('./db');
const { dbType } = require('../common/db');
const { StatusCodeError } = require('../common/error');
const shortHash = require('short-hash');

function makeSSHA512(pw, salt = process.env.CRYPTO_SALT) {
  if (!salt) {
    throw new Error(`Couldn't found CRYPTO_SALT configuration!`);
  }

  return crypto.pbkdf2Sync(pw, salt, 10000, 64, 'sha512').toString('base64');
}

/**
 * SignUp V1
 * @param {string} id
 * @param {string} pw
 */
function signUp(id, pw) {
  try {
    const table = getDB(dbType.USER).get('user');

    // check duplicated id
    if (_.find(table.value(), user => user.id === id)) {
      throw new StatusCodeError(409, `Duplicated Id: ${id}`);
    }

    const encrypted = makeSSHA512(pw);

    table.push({ id: id, pw: encrypted }).write();
  } catch (e) {
    throw e;
  }
}

/**
 * SignIn V1
 * @param {string} id
 * @param {string} pw
 * @returns {string} token
 */
function signIn(id, pw) {
  try {
    const table = getDB(dbType.USER).get('user');

    const ssha = makeSSHA512(pw);

    if (_.find(table.value(), user => user.id === id && user.pw === ssha)) {
      // not checking for duplicated session
      getDB(dbType.SESSION).get('session').push(id).write();
    } else {
      throw new StatusCodeError(404, `Wrong id or password.`);
    }

    return shortHash(id);
  } catch (e) {
    throw e;
  }
}

/**
 * SignOut V1
 * @param {string} id
 */
function signOut(id) {
  try {
    const sessions = getDB(dbType.SESSION).get('session');

    // remove from sessions
    sessions.pull(id).write();
  } catch (e) {
    throw e;
  }
}

module.exports = {
  signUp,
  signIn,
  signOut,
}
