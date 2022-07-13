userLoggedMiddleware = (req, res, next) => {
    if (req.session.userLogged) {
        return res.redirect('/users/menu/' + req.session.userLogged.id);
    }

    next();
};

module.exports = userLoggedMiddleware;