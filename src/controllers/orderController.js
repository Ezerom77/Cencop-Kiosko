const db = require("../../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const orderController = {
  index: (req, res) => {
    if (req.session.user.admin) {
      db.Transacciones.findAll({
        where: {
          id_estado: {
            [Op.between]: [1, 2]
          },
        },
        include: [
          { association: "productos" },
          { association: "comprador" },
          { association: "estado" },
        ],
      }).then((ordenes) => {
        res.render("orders", { ordenes: ordenes, auth: req.session.user });
      });
    } else {
      db.Transacciones.findAll({
        where: {
          id_comprador: req.session.user.id,
          id_estado: {
            [Op.between]: [1, 2]
          },
         },
        include: [
          { association: "productos" },
          { association: "comprador" },
          { association: "estado" },
        ],
      }).then((ordenes) => {
        res.render("orders", { ordenes: ordenes, auth: req.session.user });
      });
    }
  },
  detail: (req, res) => {
    db.Transacciones.findOne({
      where: { id: req.params.id },
      include: [
        { association: "productos" },
        { association: "comprador" },
        { association: "estado" },
        {
          association: "direccion",
          include: [
            { association: "ciudades" },
            { association: "provincias" },
            { association: "paises" },
          ],
        },
      ],
    }).then((orden) => {
      console.log(orden.fecha_entrega);
      res.render("orderDetail", { orden: orden, auth: req.session.user });
    });
  },
  inProcess: (req, res) => {
    db.Transacciones.findOne({
      where: { id: req.params.id },
      include: [
        { association: "productos" },
        { association: "comprador" },
        { association: "estado" },
        {
          association: "direccion",
          include: [
            { association: "ciudades" },
            { association: "provincias" },
            { association: "paises" },
          ],
        },
      ],
    }).then((orden) => {
      res.render("orderInProcess", { orden: orden, auth: req.session.user });
    });
  },
  processed: async (req, res) => {
    let orderToProcess = {
      id_estado: req.body.estado,
      observacionesProd: req.body.observacionesProd,
      fecha_entrega: req.body.entrega,
    };
    await db.Transacciones.update(orderToProcess, {
      where: { id: req.params.id },
    });
    res.redirect("/order");
  },
  finished: (req, res) => {
    if (req.session.user.admin) {
      db.Transacciones.findAll({
        where: {
          id_estado: {
            [Op.between]: [3, 4]
          },
        },
        include: [
          { association: "productos" },
          { association: "comprador" },
          { association: "estado" },
        ],
      }).then((ordenes) => {
        res.render("ordersFinished", { ordenes: ordenes, auth: req.session.user });
      });
    } else {
      db.Transacciones.findAll({
        where: {
          id_comprador: req.session.user.id,
          id_estado: {
            [Op.between]: [3, 4]
          },
        },
        include: [
          { association: "productos" },
          { association: "comprador" },
          { association: "estado" },
        ],
      }).then((ordenes) => {
        res.render("ordersFinished", { ordenes: ordenes, auth: req.session.user });
      });
    }
  },
};
module.exports = orderController;
