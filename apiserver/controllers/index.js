function defaultResponseAPI(req, res) {
  res.status(200).send('...?!')
}

module.exports = {
  defaultResponseAPI,
}
