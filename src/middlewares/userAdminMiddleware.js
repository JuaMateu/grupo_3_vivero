userLoggedMiddleware = (req, res, next) => {
    if (req.session.userLogged.user_category_id === 3) {
        return res.redirect('/users/menu/');
    }

    next();
};

module.exports = userLoggedMiddleware;