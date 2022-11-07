let adminMiddleware = (req, res, next) => {
  if(req.session.user.admin) {
      next();
  }
  else {
      res.redirect('/');
  }
}

module.exports = adminMiddleware;