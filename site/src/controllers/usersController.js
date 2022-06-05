const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        return res.render("users/login");
    },
    register: (req, res) => {
        return res.render("users/register");
    },
    userRecovery: (req, res) => {
        return res.render("users/userRecovery");
    },
    list: (req,res) => {
        return res.render("users/usersList", {users});
    },
    addForm : (req,res) => {
        return res.render("users/usersAdd");
    }
}

module.exports = controller