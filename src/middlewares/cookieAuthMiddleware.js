const db = require("../../models");

let cookieAuthMiddleware = (req, res, next) => {
  if (req.cookie != undefined) {
    if (req.cookie.recordame != undefined && req.session.user == undefined) {
      db.Users.findOne({
        where: { email: req.cookie.recordame },
      }).then((users) => {
        req.session.user = users;
      });
    }
  }
  next();
};
module.exports = cookieAuthMiddleware;
