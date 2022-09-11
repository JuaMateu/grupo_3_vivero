const db = require("../../database/models");

const controller = {
  detail: async (req, res) => {
    let product = await db.Product.findByPk(req.params.id);
    return res.json(product);
  },

  purchase: async function (req, res) {
    let order = await db.Order.create(
      { ...req.body },
      // { ...req.body, user: req.session.userLogged.id },
      {
        include: db.Order.OrderToProduct,
      }
    );
    res.json({ ok: true, status: 200, order: order });
  },
};

module.exports = controller;
