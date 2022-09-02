const db = require("../database/models");
const sequelize = db.sequelize;

const moment = require("moment");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const Users = db.User;
const Address = db.Address;

const controller = {
  // register form
  register: (req, res) => {
    return res.render("users/register");
  },
  // Login Form
  login: (req, res) => {
    return res.render("users/login");
  },

  // Proceso de Registro
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

  //Proceso de logeo
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
        //si la password es correcta se guarda el usuario en session
        if (passwordControlPoint) {
          req.session.userLogged = userToLogin.dataValues;

          //si además "Recordar usuario" esta activado guardamos una cookie con el email
          if (req.body.recordarUsuario) {
            res.cookie("userId", userToLogin.id, { maxAge: 1000 * 60 * 5 });
          }
          //redirigimos al menu de usuario
          return res.redirect("/users/menu/");

          //si la password no es correcta devolvemos el error "La contraseña no es válida."
        } else {
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
      // Si no se encuentra el usuario correspondiente al mail se devuelve un error
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

  // TODO: En desarrollo
  userRecovery: (req, res) => {
    return res.render("users/userRecovery");
  },

  // ==  Menu admin - CRUD =

  // 1 Listar usuarios
  list: (req, res) => {
    Users.findAll().then((users) => {
      return res.render("users/usersList", { users });
    });
  },
  
  // 2 Agregar usuario
  addForm: (req, res) => {
    return res.render("users/usersAdd");
  },
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
    let userID = await Users.create(data);
    console.log(userID);

    res.redirect("/users/");
  },

  // 3 - editar Usuario
  editForm: async (req, res) => {
    // READ
    let userToEdit = await Users.findByPk(req.params.id, { include: ["address"] });
    console.log(userToEdit.dataValues)
    return res.render("../views/users/usersEdit.ejs", {
      editUser: userToEdit.dataValues,
      
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

  editAddress: async (req, res) => {

    //validamos los datos recibidos
    // const resultValidation = validationResult(req);
    // //si hay errores devolvemos la misma vista con los errores, los datos cargados y el usuario loggeado
    // if (resultValidation.errors.length > 0) {
    //   return res.render("users/menu/usersMenuContact.ejs", {
    //     errors: resultValidation.mapped(),
    //     oldData: req.body,
    //     user: req.params.id,
    //   });
    // }

    // Direccion a guardar
    console.log(req.body)
    let addressData = {
      ...req.body,
      name: 'unica',
      user_id: req.params.id,
    };

    console.log(addressData)

    
    // busca si hay un Address correspondiente al usuario logueado (si no hay devuelve false)
    let hasAddress = await Address.findOne({ where: { user_id: req.params.id } });

    // si el usuario tiene dirección guardada se actualiza, si no se crea
    if (hasAddress) {
      Address.update(addressData, { where: { user_id: req.params.id } });
    } else {
      Address.create(addressData);
    }

    // redirigimos al edit de usuario
    res.redirect("/users/edit/" + req.params.id);
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