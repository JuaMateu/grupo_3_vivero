const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

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
        return res.render("users/usersList", { users });
    },

    addForm : (req,res) => {
        // READ
        return res.render("users/usersAdd");
    },

    processRegister: (req,res) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('users/register',{
                errors: resultValidation.mapped(),
                oldData:req.body
            });
        };

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
        password: bcryptjs.hashSync(req.body.passwordCheck,10),
        img: '/img/otros/user.png',
        }
        
        // agregar el user al array
        users.push(newUser);
        let usersExport = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersFilePath, usersExport, 'utf-8');
        // SE LOGEA EN SESSION
        req.session.userLogged = newUser

        return res.redirect(`/users/menu/contact/`);
    },

    processLogin: (req, res) => {
        userToLogin = users.find(user => user['email'] == req.body.email);

        if (userToLogin) {
            let passwordControlPoint = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordControlPoint) {
                req.session.userLogged = userToLogin;

                if (req.body.recordarUsuario) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 5 });
                }

                return res.redirect('/users/menu/');
            }

            return res.render('users/login', {
                errors: {
                    password: {
                        msg: 'La contraseña no es válida.'
                    }
                },
                oldData: req.body
            });
        }

        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'El correo electrónico no es válido.'
                }
            }
        });
    },

    processLogout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        return res.redirect('/');
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

        fs.writeFileSync(usersFilePath, usersExport, 'utf-8');

        res.redirect("/users/");
    },
    
    editForm: (req,res) => {
        // READ
        let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});
        
        return res.render('../views/users/usersEdit.ejs', { editUser });
    },
    
    menu: (req,res) => {
        // READ
        // let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});
        // renderizamos la vista con el elemento correpondiente
        
        
        return res.render('../views/users/menu/usersMenu.ejs', { user: req.session.userLogged});
    },
    
    contactform: (req,res) => {
        // READ
        // let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});
        // renderizamos la vista con el elemento correpondiente


        return res.render('../views/users/menu/usersMenuContact.ejs',{ user: req.session.userLogged});
    },

    contactAction: (req,res) =>  {
        var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let userIndex = users.findIndex(user => user.id == req.session.userLogged.id)
        users[userIndex].address = req.body.address,
        users[userIndex].mobile = req.body.mobile,
        req.session.userLogged = users[userIndex]

        // sobreescribimos el JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
        
        // redirigimos
        res.redirect("/users/menu/");

    },

    nameForm: (req,res) => {
        // READ
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
         [ editUser ]  = users.filter(user => {return user.id == req.session.userLogged.id});
        
        // renderizamos la vista con el elemento correpondiente

        return res.render('../views/users/menu/usersMenuBasicData.ejs',{ user: editUser});
    },
    nameAction: (req,res) =>  {
        let userIndex = users.findIndex(user => user.id == req.session.userLogged.id)
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('../views/users/menu/usersMenuBasicData.ejs',{
                errors: resultValidation.mapped(),
                oldData: req.body,
                user: users[userIndex]
            });
        };


        users[userIndex].firstName = req.body.firstName,
        users[userIndex].lastName = req.body.lastName,
        users[userIndex].birth = req.body.birth 
        

        req.session.userLogged = users[userIndex]
        // sobreescribimos el JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
        
        // redirigimos
        res.redirect("/users/menu/");

    },
    
    
    passForm: (req,res) => {
        // READ
        // let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});
        // renderizamos la vista con el elemento correpondiente
        
        return res.render('../views/users/menu/usersMenuPassword.ejs',{ user: req.session.userLogged});
    },

    passwordUpdate: (req,res) =>  {
        var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let userIndex = users.findIndex(user => user.id == req.session.userLogged.id);
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('../views/users/menu/usersMenuPassword.ejs',{
                errors: resultValidation.mapped(),
                user: users[userIndex]
            });
        };
        let passwordControlPoint = bcryptjs.compareSync(req.body.actualPass, users[userIndex].password);
        console.log(passwordControlPoint);
        if (passwordControlPoint){
            if (req.body.newPassCheck == req.body.newPass) {
                users[userIndex].password = bcryptjs.hashSync(req.body.newPassCheck,10)
            }
        }
        console.log(resultValidation.errors);
        console.log(resultValidation.errors.length);

        req.session.userLogged = users[userIndex] 

        // sobreescribimos el JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
        
        // redirigimos
        res.redirect("/users/menu/");
    },
    
    avatarForm: (req,res) => {
        // READ
        // let  [ editUser ]  = users.filter(user => {return user.id == req.params.id});
        // renderizamos la vista con el elemento correpondiente
        
        return res.render('../views/users/menu/usersMenuImage.ejs',{ user: req.session.userLogged});
    },
    
    avatarAction: (req,res) => {
        // index a editar
        let userIndex = users.findIndex(user => user.id == req.session.userLogged.id)
        // si hay archivo se actualiza la ruta en session y en base de datos
        if (!req.file) {
            res.redirect("/users/menu/");
        }
        req.session.userLogged.img = "/img/users/avatar/" + req.file.filename 
        users[userIndex].img = req.session.userLogged.img
        // sobreescribimos el JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
        // redirigimos
        res.redirect("/users/menu/");
    },
    
    edit: (req, res) => {
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
    
    delete: (req, res) => {
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