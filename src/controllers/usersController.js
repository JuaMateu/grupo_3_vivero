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
            res.cookie("userId", userToLogin.id, { maxAge: 1000 * 60 * 5 });
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
            oldData: req.body.email,
          });
        }
      }
      return res.render("users/login", {
        errors: {
          email: {
            msg: "las credenciales no son válidas.",
          }
        },
      });
    });
  },
  processLogout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userId");
    return res.redirect("/");
  },
  //TODO crear usuario desde el menu de admin. Hay que revisar y cambiar la vista
  create: async (req, res) => {
    const resultValidation = validationResult(req);
    //Validaciones de formulario
    if (resultValidation.errors.length > 0) {
      return res.render("users/usersAdd", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
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
 
delete: async (req, res) => {
    // DELETE
    await Users.destroy({
        where:{id:req.params.id,force:true}
    })
    
    res.redirect("/users/");
}

}

module.exports = controller;