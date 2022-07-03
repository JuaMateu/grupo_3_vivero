userFoundMiddleware = (req, res, next) => {
    res.locals.userFound = false;

    if (req.session && req.session.userLogged) {
        res.locals.userFound = true;
        res.locals.userLogged = req.session.userLogged;
    }
    
    next();
}

module.exports = userFoundMiddleware;