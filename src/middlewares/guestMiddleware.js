let guestMiddleware = (req, res, next) => {
    if(req.session.user == undefined) {
        next();
    }
    else {
        res.redirect('/users/perfil');
    }
}

module.exports = guestMiddleware;