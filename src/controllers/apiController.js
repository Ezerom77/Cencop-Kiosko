const db = require("../../models");
const sequelize = require("sequelize");

const apiController = {
  index: (req, res) => {
    res.status(200).json({
      status: 200,
      message: "API funcionando correctamente",
      servicios: {
        "api/usersCount": "Total de usuarios",
        "api/lastUser": "Ultimo usuario creado",
        "api/productCount": "Total de productos",
        "api/lastProduct": "Ultimo producto creado",
        "api/users": "Arreglo de usuarios",
        "api/products": "Arreglo de productos",
        "api/categorias": "Detalle categorias",
        "api/product/:id": "Detalle un producto por ID",
        "api/user/:id": "Detalle de un usuario por ID sin datos privados",
        "api/prodXCat": "Cantidad de productos por categoria",
      },
    });
  },
  usersCount: (req, res) => {
    db.Users.findOne({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      raw: true,
    }).then((users) => {
      res.status(200).json({
        status: 200,
        message: "Users count",
        url: "api/usersCount",
        data: users.count,
      });
    });
  },
  lastUser: (req, res) => {
    db.Users.findOne({ order: [["id", "DESC"]] }).then((user) => {
      res.status(200).json({
        status: 200,
        message: "Last user",
        url: "api/lastUser",
        data: user,
      });
    });
  },
  productsCount: (req, res) => {
    db.Products.findOne({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      raw: true,
    }).then((products) => {
      res.status(200).json({
        status: 200,
        message: "Products count",
        url: "api/productCount",
        data: products.count,
      });
    });
  },
  lastProduct: (req, res) => {
    db.Products.findOne({
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
       order: [["id", "DESC"]] }).then((products) => {
      res.status(200).json({
        status: 200,
        message: "Last product",
        url: "api/lastProduct",
        data: products,
      });
    });
  },
  //estas son los servicios que pide el Sprint
  users: (req, res) => {
    db.Users.findAll().then((users) => {
      res.status(200).json({
        status: 200,
        message: "Users",
        url: "api/users",
        count: users.length,
        users: users,
      });
    });
  },
  products: (req, res) => {
    db.Products.findAll({
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
    }).then((products) => {
      res.status(200).json({
        status: 200,
        message: "Products",
        url: "api/products",
        count: products.length,
        products: products,
      });
    });
  },
  categorias: (req, res) => {
    db.Categorias.findAll().then((categorias) => {
      res.status(200).json({
        status: 200,
        message: "Categorias",
        url: "api/categorias",
        count: categorias.length,
        categorias: categorias,
      });
    });
  },
  product: (req, res) => {
    db.Products.findOne({
      where: { id: req.params.id },
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
    }).then((product) => {
      res.status(200).json({
        status: 200,
        message: "Product detail",
        url: "api/product/:id",
        product: product,
      });
    });
  },
  user: (req, res) => {
    db.Users.findOne({
      where: { id: req.params.id },
    }).then((user) => {
      res.status(200).json({
        status: 200,
        message: "User detail",
        url: "api/user/:id",
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          avatar: user.avatar,
          admin: user.admin,
          fecha_creacion: user.fecha_creacion,
          ultima_edicion: user.ultima_edicion,
          fecha_baja: user.fecha_baja,
        },
      });
    });
  },
  prodXCat: (req, res) => {
    db.Producto_Categoria.findAll({
      include: [{ association: "categorias" }],
      group: ["id_Categoria"],
      attributes: [[sequelize.fn("COUNT", "id_Producto"), "sumaProductos"]],
    }).then((producto_categoria) => {
      console.log("primeravez" + producto_categoria[0].sumaProductos);
      res.status(200).json({
        status: 200,
        message: "ProductosPorCategoria",
        url: "api/prodXCat",
        producto_categoria: producto_categoria,
      });
    });
  },
};

module.exports = apiController;
