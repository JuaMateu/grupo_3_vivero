const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        // READ
        return res.render("users/login");
    },
    register: (req, res) => {
        // READ
        return res.render("users/register");
    },
    userRecovery: (req, res) => {
        // READ
        return res.render("users/userRecovery");
    },
    list: (req,res) => {
        // READ
        return res.render("users/usersList", {users});
    },
    addForm : (req,res) => {
        // READ
        return res.render("users/usersAdd");
    },
    create: (req,res) => {
        // CREATE
        // recepcion de formulario de entrada de usuario
        let newUser ={};
        newUser.id = users.length+1;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = req.body.email;
        newUser.mobile = req.body.mobile;
        newUser.address = req.body.address;
        newUser.birth = req.body.birth;
        newUser.img = req.body.img;
        newUser.orders = 0;
        newUser.cart = 0;
        
        // agregar el producto al array
        users.push(newUser);

        let usersExport = JSON.stringify(users, null, 2);
        console.log(usersExport);
        fs.writeFileSync(usersFilePath, usersExport, 'utf-8');

        res.redirect("/users/");
    },
    editForm: (req,res) => {
        // READ
        let idUser = req.params.idUser;

        let editUser = users[idUser];

        return res.render('../views/users/usersEdit.ejs',{editUser : editUser});
    },
    edit: (req,res) => {
        // UPDATE
        // solicitamos el id de los parametros
        let idUser = req.params.idUser;
        // para ajustar el indice recorrido, restamos 1 y situarnos en el elemento correcto
        let editUser = users[idUser-1];
        // editamos el usuario entrante
        editUser.firstName = req.body.firstName;
        editUser.lastName = req.body.lastName;
        editUser.email = req.body.email;
        editUser.mobile = req.body.mobile;
        editUser.address = req.body.address;
        editUser.birth = req.body.birth;
        editUser.img = req.body.img;
        editUser.orders = 0;
        editUser.cart = 0;
        // sobreescribimos el JSON
        let usersExport = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersFilePath, usersExport, 'utf-8');
        // redirigimos
        res.redirect("/users/");
    },
    delete: (req,res) => {
        // DELETE
        let idUser = req.params.idUser;
        users = users.filter(user => {
            return user.id != idUser
        });

        let usersExport = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersFilePath, usersExport,'utf-8');
        
        res.redirect("/users/");
    }
    
}

module.exports = controller