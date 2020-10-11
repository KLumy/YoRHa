const { StatusCodeError } = require('../common/error');
const { signUp, signIn, signOut } = require('../server/user');

function postSignUp(req, res) {
  try {
    const { id, pw } = req.body;

    signUp(id.toString(), pw.toString());

    res.status(200).end();
  } catch (e) {
    if (e instanceof StatusCodeError) {
      res.status(e.code).json({
        "message": e.message
      });
    } else {
      // send only status code
      res.status(400).end();
    }
  }
}

function postSignIn(req, res) {
  try {
    const { id, pw } = req.body;

    const token = signIn(id.toString(), pw.toString());

    res.status(200).json({
      token: token,
    });
  } catch (e) {
    if (e instanceof StatusCodeError) {
      res.status(e.code).json({
        "message": e.message
      });
    } else {
      // send only status code
      res.status(400).end();
    }
  }
}

function postSignOut(req, res) {
  try {
    const { id } = req.body;

    signOut(id.toString());

    res.status(200).end();
  } catch (e) {
    if (e instanceof StatusCodeError) {
      res.status(e.code).json({
        "message": e.message
      });
    } else {
      // send only status code
      res.status(400).end();
    }
  }
}

module.exports = {
  postSignUp,
  postSignIn,
  postSignOut,
}
