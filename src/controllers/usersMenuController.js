const db = require("../database/models");
const sequelize = db.sequelize;

const moment = require("moment");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const Users = db.User;
const Address = db.Address;

const controller = {
  menu: async (req, res) => {
    let userDb = await Users.findByPk(req.session.userLogged.id, {
      include: ["address"],
    });
    let address = "";
    if (userDb.address[0]) {
      address = `${userDb.address[0].street} ${userDb.address[0].number}, ${userDb.address[0].city}`;
    }
    return res.render("users/menu/usersMenu.ejs", {
      user: userDb,
      address,
    });
  },
  contactform: async (req, res) => {
    let userDb = await Users.findByPk(req.session.userLogged.id, {
      include: ["address"],
    });

    return res.render("users/menu/usersMenuContact.ejs", {
      user: userDb,
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
      user_id: req.session.userLogged.id,
    };

    let hasAddress = await Address.findOne({
      where: { user_id: req.session.userLogged.id },
    });

    //si es la primera address guardada se crea una entrada si no se actualiza
    if (hasAddress) {
      Address.update(data, { where: { user_id: req.session.userLogged.id } });
    } else {
      Address.create(data);
    }
    if (req.body.mobile) {
      Users.update(
        { mobile: req.body.mobile },
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
  nameAction: async (req, res) => {
    let editUser = await Users.findOne({
      where: { id: req.session.userLogged.id },
    });
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/menu/usersMenuBasicData.ejs", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: editUser,
      });
    }
    let newData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
    };

    await Users.update(newData, { where: { id: req.session.userLogged.id } });

    // redirigimos
    res.redirect("/users/menu/");
  },
  passForm: (req, res) => {
    return res.render("users/menu/usersMenuPassword.ejs", {
      user: req.session.userLogged,
    });
  },
  passwordUpdate: async (req, res) => {
    let editUser = await Users.findOne({
      where: { id: req.session.userLogged.id },
    });

    const resultValidation = validationResult(req);

    let passwordControlPoint = bcryptjs.compareSync(
      req.body.actualPass,
      editUser.password
    );

    if (!passwordControlPoint) {
      return res.render("users/menu/usersMenuPassword.ejs", {
        errors: {
          actualPass: {
            msg: "La contraseña es incorrecta",
          },
        },
        user: editUser,
      });
    } else if (resultValidation.errors.length > 0) {
      return res.render("users/menu/usersMenuPassword.ejs", {
        errors: resultValidation.mapped(),
        user: editUser,
      });
    } else {
      let newPass = bcryptjs.hashSync(req.body.newPassCheck, 10);
      // sobreescribimos el JSON
      await Users.update(
        { password: newPass },
        { where: { id: req.session.userLogged.id } }
      );

      // redirigimos
      res.redirect("/users/menu/");
    }
  },
  avatarForm: (req, res) => {
    return res.render("users/menu/usersMenuImage.ejs", {
      user: req.session.userLogged,
    });
  },
  avatarAction: async (req, res) => {
    // index a editar

    // si hay archivo se actualiza la ruta en session y en base de datos
    if (!req.file) {
      res.redirect("/users/menu/");
    }
    req.session.userLogged.img = "/img/users/avatar/" + req.file.filename;
    await Users.update(
      { img: req.session.userLogged.img },
      { where: { id: req.session.userLogged.id } }
    );
    // sobreescribimos el JSON
    // redirigimos
    res.redirect("/users/menu/");
  },
};

module.exports = controller;
