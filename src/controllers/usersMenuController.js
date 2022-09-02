const db = require("../database/models");
const sequelize = db.sequelize;

const moment = require("moment");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const Users = db.User;
const Address = db.Address;

const controller = {

  // === Menu de usuario ===//
  // muestra informacion del usuario y permite modificar sus datos a través de distintos formularios

  menu: async (req, res) => {
    // busca al usuario de la base de datos a partir del session id
    let userDb = await Users.findByPk(req.session.userLogged.id, {include: ["address"]});

    // se crea direccion vacía para enviar al menú
    let address = "";
    
    // En caso de que el usuario tenga direccion relacionada se la envía a la vista con formato legible
    if (userDb.address[0]) { //por el momento solo se puede cargar una direccion por usuario
      address = `${userDb.address[0].street} ${userDb.address[0].number}, ${userDb.address[0].city}`;
    }
    return res.render("users/menu/usersMenu.ejs", { user: userDb, address });
  },

  // === Formulario de contacto (muestra y/o actualiza direcciones) === //
  contactform: async (req, res) => {
    let userDb = await Users.findByPk(req.session.userLogged.id, {include: ["address"]});

    return res.render("users/menu/usersMenuContact.ejs", { user: userDb });
  },
  
  contactAction: async (req, res) => {
    console.log("Usuario");
    console.log(req.session.userLogged);
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
    // si no hay errores armamos el objeto de address
    let data = {
      ...req.body,
      name: "unica", //por ahora la direccion es unica, el campo name no se usa
      user_id: req.session.userLogged.id, // el user_id es foreign key del usuario logeado
    };
    // busca si hay un address correspondiente al usuario logueado (si no hay devuelve false)
    let hasAddress = await Address.findOne({ where: { user_id: req.session.userLogged.id } });

    // si el usuario tiene dirección guardada se actualiza, si no se crea
    if (hasAddress) {
      Address.update(data, { where: { user_id: req.session.userLogged.id } });
    } else {
      Address.create(data);
    }
    //esta parte actualiza el telefono si fue cargado
    if (req.body.mobile) {
      Users.update( { mobile: req.body.mobile }, { where: { id: req.session.userLogged.id }} );
    }
    // redirigimos al menú
    res.redirect("/users/menu/");
  },

  // === Formulario de nombre (muestra y/o actualiza el nombre del usuario) === //
  nameForm: async (req, res) => {
    // READ
    let editUser = await Users.findOne({ where: { id: req.session.userLogged.id } });
    // guardamos la fecha actual, se envía para limitar en el front la fecha de nacimiento
    let actualDate = moment().format("YYYY-MM-DD");

    return res.render("users/menu/usersMenuBasicData.ejs", { user: editUser, date: actualDate });
  },

  nameAction: async (req, res) => {
    let editUser = await Users.findOne({ where: { id: req.session.userLogged.id }});
    //validaciones del body
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/menu/usersMenuBasicData.ejs", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: editUser,
      });
    }

    await Users.update( {...req.body}, { where: { id: req.session.userLogged.id } });

    // redirigimos
    res.redirect("/users/menu/");
  },

  // === Actualizar password === //
  passForm: (req, res) => {
    return res.render("users/menu/usersMenuPassword.ejs", { user: req.session.userLogged, });
  },
  
  passwordUpdate: async (req, res) => {
    let editUser = await Users.findOne({ where: { id: req.session.userLogged.id } });

    const resultValidation = validationResult(req);
    
    //controla password actual
    let passwordControlPoint = bcryptjs.compareSync( req.body.actualPass, editUser.password );
    // si la password no coincide devuelve error
    if (!passwordControlPoint) {
      return res.render("users/menu/usersMenuPassword.ejs", {
        errors: {
          actualPass: {
            msg: "La contraseña es incorrecta",
          },
        },
        user: editUser,
      });
      //si la password actual coincide continua con validaciones de password nuevas
    } else if (resultValidation.errors.length > 0) { 
      return res.render("users/menu/usersMenuPassword.ejs", {
        errors: resultValidation.mapped(),
        user: editUser,
      });
      // si no hay errores encripta password y la guarda en base de datos
    } else { 
      let newPass = bcryptjs.hashSync(req.body.newPassCheck, 10);
      
      await Users.update( { password: newPass }, { where: { id: req.session.userLogged.id } });

      // redirigimos al menu
      res.redirect("/users/menu/");
    }
  },

  // === Actualizar Avatar === //
  avatarForm: (req, res) => {
    return res.render("users/menu/usersMenuImage.ejs", { user: req.session.userLogged });
  },
  avatarAction: async (req, res) => {

    // si no se recibe una imagen se redirige al menú sin acciones
    if (!req.file) {
      return res.redirect("/users/menu/");
    }

    let img = "/img/users/avatar/" + req.file.filename;
    await Users.update( { img }, { where: { id: req.session.userLogged.id } });

    // redirigimos
    res.redirect("/users/menu/");
  },
};

module.exports = controller;
