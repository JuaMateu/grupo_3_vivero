const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

userFoundMiddleware = (req, res, next) => {
    res.locals.userFound = false;

    let emailFromCookie = req.cookies.userEmail;
    let userFromCookie = users.find(user => user['email'] == emailFromCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.userFound = true;
        res.locals.userLogged = req.session.userLogged;
    }
    
    next();
}

module.exports = userFoundMiddleware;