const db = require("../../models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
//buscador
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Controllers
const productController = {
  list: (req, res) => {
    db.Products.findAll({
      include: [
        { association: "color" },
        { association: "size" },
        { association: "imagenes" },
      ],
    }).then(function (products) {
      res.render("productList", {
        title: "Todos los productos",
        products: products,
        auth: req.session.user,
      });
    });
  },
  add: (req, res) => {
    db.Colores.findAll().then(function (colores) {
      db.Sizes.findAll().then(function (sizes) {
        db.Categorias.findAll().then(function (categorias) {
          res.render("productCreate", {
            colores: colores,
            sizes: sizes,
            categorias: categorias,
            auth: req.session.user,
          });
        });
      });
    });
  },
  store: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      db.Colores.findAll().then(function (colores) {
        db.Sizes.findAll().then(function (sizes) {
          db.Categorias.findAll().then(function (categorias) {
            res.render("productCreate", {
              colores: colores,
              sizes: sizes,
              categorias: categorias,
              errors: errors.mapped(),
              oldData: req.body,
              auth: req.session.user,
            });
          });
        });
      });
    } else {
      let productoNuevo = {
        codProducto:req.body.productCode,
        nombre:req.body.productName,
        id_color:req.body.color,
        id_size:req.body.size,
        descripcion:req.body.productDescription,
        paginas:req.body.paginas,
        indiceCobertura:req.body.cobertura,

        // nombre: req.body.productName,
        // descripcion: req.body.productDescription,
        // precio: req.body.productPrice,
        // id_color: req.body.color,
        // id_size: req.body.size,
      };
      let x = await db.Products.create(productoNuevo);
      let idP = x.dataValues.id;
      for (let i = 0; i < req.files.length; i++) {
        let objeto = { id_Producto: idP, nombreArchivo: req.files[i].filename };

        await db.imagenProducto.create(objeto);
      }
      for (let i = 0; i < req.body.categorias.length; i++) {
        let objeto2 = {
          id_Producto: idP,
          id_Categoria: req.body.categorias[i],
        };

        await db.Producto_Categoria.create(objeto2);
      }
      res.redirect("/products");
    }
  },

  detail: (req, res) => {
    db.Products.findByPk(req.params.id, {
      include: [
        { association: "color" },
        { association: "size" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
    }).then(function (producto) {
      res.render("productDetail", {
        productDetail: producto,
        auth: req.session.user,
      });
    });
  },
  edit: (req, res) => {
    let pedidoProducto = db.Products.findByPk(req.params.id);
    let pedidosizes = db.Sizes.findAll();
    let pedidoColores = db.Colores.findAll();
    let pedidoCategorias = db.Categorias.findAll();

    Promise.all([
      pedidoProducto,
      pedidosizes,
      pedidoColores,
      pedidoCategorias,
    ]).then(function ([ProductoAEditar, sizes, colores, categorias]) {
      res.render("productEdit", {
        ProductoAEditar: ProductoAEditar,
        sizes: sizes,
        colores: colores,
        categorias: categorias,
        auth: req.session.user,
      });
    });
  },
  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      db.Colores.findAll().then(function (colores) {
        db.Sizes.findAll().then(function (sizes) {
          db.Categorias.findAll().then(function (categorias) {
            db.Products.findByPk(req.params.id).then(function (
              ProductoAEditar
            ) {
              res.render("productEdit", {
                colores: colores,
                sizes: sizes,
                categorias: categorias,
                errors: errors.mapped(),
                oldData: req.body,
                ProductoAEditar: ProductoAEditar,
                auth: req.session.user,
              });
            });
          });
        });
      });
    } else {
      let productoAEditar = {
        nombre: req.body.productName,
        descripcion: req.body.productDescription,
        precio: req.body.productPrice,
        id_color: req.body.color,
        id_size: req.body.talle,
      };
      await db.Products.update(productoAEditar, {
        where: { id: req.params.id },
      });
      await db.Producto_Categoria.destroy({
        where: { id_Producto: req.params.id },
      });
      for (let i = 0; i < req.body.categorias.length; i++) {
        let objeto = {
          id_Producto: req.params.id,
          id_Categoria: req.body.categorias[i],
        };
        await db.Producto_Categoria.create(objeto);
      }

      res.redirect("/products/detail/" + req.params.id);
    }
  },
  delete: (req, res) => {
    db.imagenProducto
      .findAll({ where: { id_Producto: req.params.id } })
      .then(function (imagenes) {
        for (let i = 0; i < imagenes.length; i++) {
          console.log("esta imagen hay que borrar" + imagenes[i].nombreArchivo);
          fs.unlinkSync(
            path.join(
              __dirname,
              "../../public/images/products/" + imagenes[i].nombreArchivo
            )
          );
        }
      })
      .then(
        db.Products.destroy({
          where: { id: req.params.id },
        })
      )
      .then(function () {
        res.redirect("/products");
      });
  },
  search: (req, res) => {
    db.Products.findAll({
      where: {
        nombre: {
          [Op.like]: "%" + req.query.q + "%",
        },
      },
      include: [
        { association: "color" },
        { association: "size" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
    }).then(function (products) {
      res.render("productList", {
        title: "Todos los productos",
        products: products,
        auth: req.session.user,
      });
    });
  },
};
module.exports = productController;
