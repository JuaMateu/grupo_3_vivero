const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        // READ
        return res.render("users/login");
    },
    registerForm: (req, res) => {
        // READ
        return res.render("users/register");
    },
    userRecovery: (req, res) => {
        // READ
        return res.render("users/userRecovery");
    },
    list: (req,res) => {
        // READ
        return res.render("users/usersList", { users });
    },
    addForm : (req,res) => {
        // READ
        return res.render("users/usersAdd");
    },
    registerAction: (req,res) => {
        // CREATE ID
        let newId = 1
        if (users.length != 0) {
            const ids = users.map(user => {  // consigue un array con todos los Ids de usuarios
            return user.id;
            });
            newId = Math.max(...ids)+1; // busca el id mas alto y suma 1 para obtener el nuevo id
        }
        // recepcion de formulario de entrada de usuario
        let newUser = {
        id: newId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.passwordCheck,
        img: '/img/otros/user.png',
        }
        
        // agregar el user al array
        users.push(newUser);

        let usersExport = JSON.stringify(users, null, 2);
        console.log(usersExport);
        fs.writeFileSync(usersFilePath, usersExport, 'utf-8');

        res.redirect(`/users/menu/${newId}`);
    },
    create: (req,res) => {
        // CREATE ID
        let newId = 1
        if (users.length != 0) {
            const ids = users.map(user => {  // consigue un array con todos los Ids de usuarios
            return user.id;
            });
            newId = Math.max(...ids)+1; // busca el id mas alto y suma 1 para obtener el nuevo id
        }
        // recepcion de formulario de entrada de usuario
        let newUser ={
        id: newId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        birth: req.body.birth,
        img: req.body.img,
        }
        
        // agregar el user al array
        users.push(newUser);

        let usersExport = JSON.stringify(users, null, 2);
        console.log(usersExport);
        fs.writeFileSync(usersFilePath, usersExport, 'utf-8');

        res.redirect("/users/");
    },
    editForm: (req,res) => {
        // READ
        let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});

        return res.render('../views/users/usersEdit.ejs',{ editUser });
    },
    menuForm: (req,res) => {
        // READ
        let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});
        // renderizamos la vista con el elemento correpondiente

        return res.render('../views/users/menu/usersMenu.ejs',{ user: editUser});
    },
    edit: (req,res) => {
        // UPDATE
        // solicitamos el id de los parametros
        let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});
        // editamos el usuario entrante
        editUser.firstName = req.body.firstName;
        editUser.lastName = req.body.lastName;
        editUser.email = req.body.email;
        editUser.mobile = req.body.mobile;
        editUser.address = req.body.address;
        editUser.birth = req.body.birth;
        editUser.img = req.body.img;
        // sobreescribimos el JSON
        let usersExport = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersFilePath, usersExport, 'utf-8');
        // redirigimos
        res.redirect("/users/");
    },
    delete: (req,res) => {
        // DELETE
        let idUser = req.params.id;
        users = users.filter(user => {
            return user.id != idUser
        });

        let usersExport = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersFilePath, usersExport,'utf-8');
        
        res.redirect("/users/");
    }
    
}

module.exports = controller