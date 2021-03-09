module.exports = (req, res, next) => {
  if (req.user) {
    if (Number(req.user.id) === Number(req.params.id) || req.user.isAdmin)
      next()
  } else {
    const err = new Error('Unauthorized!')
    err.status = 401
    next(err)
  }
}
