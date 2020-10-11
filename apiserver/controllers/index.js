function defaultResponseAPI(req, res) {
  res.status(200).json({
    "success": true,
  })
}

module.exports = {
  defaultResponseAPI,
}
