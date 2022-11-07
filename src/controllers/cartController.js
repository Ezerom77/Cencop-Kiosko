const db = require("../../models");
const verificar = (lista, id) => {
  let pos = -1;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id == id) {
      pos = i;
      break;
    }
  }
  return pos;
};

const cartController = {
  index: (req, res) => {
    let cart = req.session.cart;
    let cartValue = req.session.cartValue;
    let n = cart.length;
    if (n <= 0) {
      res.render("cartError", { auth: req.session.user });
    } else {
      res.render("cartDetail", {
        cart: cart,
        cartValue: cartValue,
        auth: req.session.user,
      });
    }
    console.log(cart)
  },
  add: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    let cartValue = req.session.cartValue;
    db.Products.findByPk(prod, {
      include: [
        { association: "color" },
        { association: "size" },
        { association: "imagenes" },
      ],
    }).then(function (product) {
      let pos = verificar(cart, prod);
      if (pos == -1) {
        let datos = {
          id: product.id,
          nombre: product.nombre,
          descripcion: product.descripcion,
          paginas: product.paginas,
          precio: product.precio,
          color: product.color.descripcion,
          size: product.size.descripcion,
          imagen: product.imagenes[0].nombreArchivo,
          cantidad:33
        };
        cartValue = cartValue + Number(product.precio);
        req.session.cartValue = cartValue;
        cart.push(datos);
        console.log(datos)
      } else {
        // res.redirect('/cart/add/'+prod)
        return res.render("cartDetail", {
          cart: cart,
          cartValue: cartValue,
          auth: req.session.user,
        });
      }
      req.session.cart = cart;
      res.render("cartDetail", {
        cart: cart,
        cartValue: cartValue,
        auth: req.session.user,
      });
    });
  },
  addQty: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    let cartValue = req.session.cartValue;
    db.Products.findByPk(prod, {
      include: [
        { association: "color" },
        { association: "size" },
        { association: "imagenes" },
      ],
    }).then(function (product) {
      let pos = verificar(cart, prod);
      if (pos == -1) {
        let datos = {
          id: product.id,
          nombre: product.nombre,
          descripcion: product.descripcion,
          paginas: product.paginas,
          precio: product.precio,
          color: product.color.descripcion,
          size: product.size.descripcion,
          imagen: product.imagenes[0].nombreArchivo,
          cantidad:req.body.cantidad
        };
        // cartValue = cartValue + Number(product.precio);
        cartValue = cartValue + Number(product.paginas * req.body.cantidad);
        req.session.cartValue = cartValue;
        cart.push(datos);
        console.log(datos)
      } else {
        // res.redirect('/cart/add/'+prod)
        return res.render("cartDetail", {
          cart: cart,
          cartValue: cartValue,
          auth: req.session.user,
        });
      }
      req.session.cart = cart;
      res.render("cartDetail", {
        cart: cart,
        cartValue: cartValue,
        auth: req.session.user,
      });
    });
  },
  remove: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    let newValue = 0;
    let aux = []; //este arreglo auxiliar es para filtrar los elementos que deben quedar en el carrito de prod, mejorable con filter probablemente.
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      if (item.id != prod) {
        aux.push(item);
        newValue = newValue + Number(item.precio);
      }
    }
    req.session.cart = aux;
    req.session.cartValue = newValue;
    res.render("cartDetail", {
      cart: aux,
      cartValue: newValue,
      auth: req.session.user,
    });
  },
  removeAll: (req, res) => {
    req.session.cart = [];
    req.session.cartValue = 0;
    res.render("cartError", { auth: req.session.user });
  },
  checkout: (req, res) => {
    let cart = req.session.cart;
    let cartValue = req.session.cartValue;
    res.render("cartCheckout", {
      cart: cart,
      cartValue: cartValue,
      auth: req.session.user,
    });
  },
  process: async (req, res) => {
    let newOrder = {
      id_comprador: req.session.user.id,
      id_estado: 1, //crear tabla de estados
      id_direccion: 2, //crear direccion en el pedido
      fecha_compra: new Date(),
      observaciones: "observaciones de ejemplo", //agregar la observacion al pedido
    };
    let orderSaved = await db.Transacciones.create(newOrder); // aca graba la orden.
    let idOrder = orderSaved.dataValues.id;
    let cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
      let item = {
        id_Producto: cart[i].id,
        cantidad: 1, //aca hay que traer la cantidad que todavia no calculo
        impresionesTotales: 1,
        id_transaccion: idOrder,
      };
      await db.Producto_Transaccion.create(item);
    }
    res.render("cartEnd", { auth: req.session.user });
  },
  test: async (req, res) => {
    let order = {
      id_comprador: req.session.user.id,
      id_estado: 1,
      id_direccion: req.session.user.id_direccion,
      fecha_compra: new Date(),
      observaciones: req.body.observaciones,
    };
    let orderSaved = await db.Transacciones.create(order);
    let idOrder = orderSaved.dataValues.id;
    let cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
      const item = {
        id_Producto: cart[i].id,
        cantidad: cart[i].cantidad,
        impresionesTotales: 1,
        id_transaccion: idOrder,
      };
      await db.Producto_Transaccion.create(item);
    }
    req.session.cart = [];
    // res.render("cartOrderOk", { auth: req.session.user, idOrder: idOrder }); con esto pincha,
    res.redirect("/order"); //ver de redireccionar a algo tipo order/idOrder y que eso renderice el detalle o algo asi.
  },

  end: (req, res) => {
    res.render("cartEnd", { auth: req.session.user });
  },
};
module.exports = cartController;
