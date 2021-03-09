module.exports = (req, res, next) => {
  if (Number(req.user.id) === Number(req.params.id)) next()
  else {
    const err = new Error('Unauthorized!')
    err.status = 401
    next(err)
  }
}
