const db = require("../database/models");
const sequelize = db.sequelize;

const moment = require("moment");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const Users = db.User;
const Address = db.Address;

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

  list: (req, res) => {
    // READ
    Users.findAll().then((users) => {
      return res.render("users/usersList", { users });
    });
  },
  addForm: (req, res) => {
    // READ
    return res.render("users/usersAdd");
  },
  processRegister: async function (req, res) {
    const resultValidation = validationResult(req);
    //Validaciones de formulario
    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // objeto data para guardar usuario
    let data = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.passwordCheck, 10),
      img: "/img/otros/user.png",
      user_category_id: 3,
    };

    //guarda el usuario en base de datos
    let newUser = await Users.create(data);

    // SE LOGEA EN SESSION
    req.session.userLogged = newUser;

    //redirigimos a menu de usuario
    return res.redirect(`/users/menu/contact/`);
  },
  processLogin: (req, res) => {
    //buscamos el usuario a logearse en la base de datos
    Users.findOne({
      where: {
        email: req.body.email,
      },
    }).then((userToLogin) => {
      //controlamos password de usuario
      if (userToLogin) {
        let passwordControlPoint = bcryptjs.compareSync(
          req.body.password,
          userToLogin.password
        );
        if (passwordControlPoint) {
          //si la password es correcta se guarda el ususario en session
          req.session.userLogged = userToLogin.dataValues;

          //si recordar usuario esta activado enviamos una cookie con el email
          if (req.body.recordarUsuario) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 5 });
          }
          //redirigimos al menu de usuario
          return res.redirect("/users/menu/");
        } else {
          //si la password no es correcta devolvemos el error
          return res.render("users/login", {
            errors: {
              password: {
                msg: "La contraseña no es válida.",
              },
            },
            oldData: req.body,
          });
        }
      }
      return res.render("users/login", {
        errors: {
          email: {
            msg: "El correo electrónico no es válido.",
          },
        },
      });
    });
  },
  processLogout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },
  //TODO crear usuario desde el menu de admin. Hay que revisar y cambiar la vista
  create: async (req, res) => {
    // recepcion de formulario de entrada de usuario
    let data = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      password: bcryptjs.hashSync(req.body.password, 10),
      // se asigna la imagen por defecto
      img: "/img/otros/user.png",
      birth: req.body.birth,
      user_category_id: 3,
    };
    // en caso de que haya una imagen se asigna la direccion de la imagen
    if (req.file) {
      data = {
        ...data,
        img: "/img/users/avatar/" + req.file.filename,
      };
    }

    // guardar el usuario en DB
    await Users.create(data);

    res.redirect("/users/");
  },

  editForm: async (req, res) => {
    // READ
    let editToUser = await Users.findOne({ where: { id: req.params.id } });
    return res.render("../views/users/usersEdit.ejs", {
      editUser: editToUser.dataValues,
    });
  },
  edit: (req, res) => {
    // UPDATE
    let userToUpdate = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      // password: bcryptjs.hashSync(req.body.password,10),
      // se asigna la imagen por defecto
      date_of_birth: req.body.birth,
      user_category_id: req.body.category,
    };
    // en caso de que haya una imagen se asigna la direccion de la imagen

    if (req.file) {
      userToUpdate = {
        ...userToUpdate,
        img: "/img/users/avatar/" + req.file.filename,
      };
    }

    // editamos el usuario entrante
    Users.update(userToUpdate, {
      where: {
        id: req.params.id,
      },
    }).then(() => {
      // redirigimos
      return res.redirect("/users/");
    });
  },
  menu: async (req, res) => {
    let userDb = await Users.findByPk(req.session.userLogged.id, {include:['address']})
    let address = `${userDb.address.street} ${userDb.address.number}, ${userDb.address.city}`

    return res.render("users/menu/usersMenu.ejs", {
      user: userDb, address
    });
  },
  contactform: async(req, res) => {
    let userDb = await Users.findByPk(req.session.userLogged.id, {include:['address']})


    return res.render("users/menu/usersMenuContact.ejs", {
      user: userDb
    });
  },
  
  contactAction: async (req, res) => {
    //validamos los datos recibidos
    const resultValidation = validationResult(req);
    //si hay errores devolvemos la misma vista con los errores, los datos cargados y el usuario loggeado
    if (resultValidation.errors.length > 0) {
      return res.render("users/menu/usersMenuContact.ejs", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: req.session.userLogged,
      });
    }

    // guardamos la nueva data del usaurio
    let data = {
      ...req.body,
      name: "unica",
    };

    //guardamos datos del usuario para ver si tiene direccion guardada
    let user = await Users.findOne({
      where: { id: req.session.userLogged.id },
    });
    // si el usuario tiene direccion cargada se actualiza, si no se graba
    if (user.address_id) {
      //actualiza direccion del usuario
      await Address.update(data, { where: { id: user.address_id } });
      //si se cargó telefono se actualiza en usuario
      if (req.body.mobile) {
        await Users.update(
          { mobile: req.body.mobile },
          { where: { id: req.session.userLogged.id } }
        );
      }
    } else { //si el usuario no tiene direccion se le asigna una nueva
      let newAddress = await Address.create(data);
      await Users.update(
        { mobile: req.body.mobile, address_id: newAddress.id },
        { where: { id: req.session.userLogged.id } }
      );
    }

    // redirigimos
    res.redirect("/users/menu/");
  },

  nameForm: async (req, res) => {
    // READ
    let editUser = await Users.findOne({
      where: { id: req.session.userLogged.id },
    });
    // renderizamos la vista con el elemento correpondiente
    let actualDate = moment().format("YYYY-MM-DD");


    return res.render("users/menu/usersMenuBasicData.ejs", {
      user: editUser,
      date: actualDate,
    });
  },
  nameAction: async (req,res) =>  {
      let editUser = await Users.findOne({where: { id: req.session.userLogged.id }});
      const resultValidation = validationResult(req);
      if(resultValidation.errors.length > 0){
          return res.render('users/menu/usersMenuBasicData.ejs',{
              errors: resultValidation.mapped(),
              oldData: req.body,
              user: editUser
          });
      }
      let newData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth
      }

      await Users.update(newData, {where:{id:req.session.userLogged.id}})
      
      // redirigimos
      res.redirect("/users/menu/");
    
  
  },
  passForm: (req,res) => {

    return res.render('users/menu/usersMenuPassword.ejs',{ user: req.session.userLogged});
},
passwordUpdate: async (req,res) =>  {
    let editUser = await Users.findOne({where: { id: req.session.userLogged.id }});
    
    const resultValidation = validationResult(req);


    let passwordControlPoint = bcryptjs.compareSync(req.body.actualPass, editUser.password);

    if (!passwordControlPoint){
        return res.render('users/menu/usersMenuPassword.ejs', {
            errors: {
                actualPass: {
                    msg: 'La contraseña es incorrecta'
                }
            },
            user: editUser
        });
    } else if(resultValidation.errors.length > 0){
        return res.render('users/menu/usersMenuPassword.ejs',{
            errors: resultValidation.mapped(),
            user: editUser
        });
    } else {
        let newPass = bcryptjs.hashSync(req.body.newPassCheck,10);
        // sobreescribimos el JSON
        await Users.update({password: newPass}, {where:{id:req.session.userLogged.id}})
        
        // redirigimos
        res.redirect("/users/menu/");
    } 

},
avatarForm: (req,res) => {

    return res.render('users/menu/usersMenuImage.ejs',{ user: req.session.userLogged});
},
avatarAction: async (req,res) => {
    // index a editar

    // si hay archivo se actualiza la ruta en session y en base de datos
    if (!req.file) {
        res.redirect("/users/menu/");
    }
    req.session.userLogged.img = "/img/users/avatar/" + req.file.filename 
    await Users.update({img:req.session.userLogged.img}, {where:{id:req.session.userLogged.id}})
    // sobreescribimos el JSON
    // redirigimos
    res.redirect("/users/menu/");
},
delete: async (req, res) => {
    // DELETE
    await Users.destroy({
        where:{id:req.params.id,force:true}
    })
    
    res.redirect("/users/");
}

}

module.exports = controller;