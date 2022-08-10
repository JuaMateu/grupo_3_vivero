const db = require("../database/models");
const Users = db.User;

userFoundMiddleware = async (req, res, next) => {
    res.locals.userFound = false;
    res.locals.isAdmin = false
    let userFromCookie

    if (req.cookies.userId){
    userFromCookie = await Users.findOne({where:{id: req.cookies.userId }});
    
    }
    
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.userFound = true;
        res.locals.userLogged = req.session.userLogged;
        if(req.session.userLogged.user_category_id != 3) {
            res.locals.isAdmin = true;
        }
    }
    
    next();
}

module.exports = userFoundMiddleware;