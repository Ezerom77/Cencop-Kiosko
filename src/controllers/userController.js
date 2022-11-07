const db = require("../../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let userController = {
  usuarios: async (req, res) => {
    await db.Users.findAll().then(function (users) {
      res.render("usersList", { users: users, auth: req.session.user });
    });
  },
  perfil: (req, res) => {
    if (req.session.user) {
      const user = req.session.user;
      res.render("usersProfile", {
        title: "Ya ingresaste! Éstos son tus datos:",
        user: user,
        auth: user,
      });
    } else {
      res.redirect("/users/login");
    }
  },
  login: (req, res) => {
    res.render("usersLogin", { auth: req.session.user });
  },
  edit: (req, res) => {
    res.render("usersEdit", { user: req.session.user, auth: req.session.user });
  },

  update: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Users.update(
        {
          nombre: req.body.userName,
          apellido: req.body.userLastName,
          email: req.body.userEmail,
          // userPassword: req.body.userPassword,
        },
        { where: { id: req.session.user.id } }
      ).then(() => {
        db.Users.findOne({
          where: { email: req.body.userEmail },
        }).then((users) => {
          req.session.user = users;
          res.cookie("recordame", users.email, { maxAge: 6000000 });
          res.redirect("/users/perfil");
        });
      });
    } else {
      res.render("usersEdit", {
        errors: errors.mapped(),
        user: req.session.user,
        auth: req.session.user,
      });
    }
  },

  logged: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Users.findOne({
        where: { email: req.body.email },
      }).then((users) => {
        if (users) {
          if (bcrypt.compareSync(req.body.password, users.password)) {
            req.session.user = users;
            // cookies
            if (req.body.recordame != undefined) {
              res.cookie("recordame", users.email, { maxAge: 100000000 });
            }
            res.redirect("/products");
          } else {
            res.render("usersLogin", {
              error: "* Credenciales invalidas",
              auth: req.session.user,
            });
          }
        } else {
          res.render("usersLogin", {
            error: "* Credenciales invalidas",
            oldData: req.body,
            auth: req.session.user,
          });
        }
      });
    } else {
      res.render("usersLogin", {
        errors: errors.mapped(),
        oldData: req.body,
        auth: req.session.user,
      }); // Error hay campos vacíos
    }
  },
  // registro: (req, res) => {
  //   res.render("usersCreate", { auth: req.session.user });
  // },
  registro: (req, res) => {
    let sector = db.Sectores.findAll();
    let ciudad = db.Ciudades.findAll();
    let provincia = db.Provincias.findAll();
    let pais = db.Paises.findAll();

    Promise.all([sector, ciudad, provincia, pais]).then(function ([
      sector,
      ciudades,
      provincias,
      paises,
    ]) {
      res.render("usersCreate", {
        sector: sector,
        ciudades: ciudades,
        provincias: provincias,
        paises: paises,
        auth: req.session.user,
      });
    });
  },
  // store: async (req, res) => {
  //   let errors = validationResult(req);
  //   if (errors.isEmpty()) {

  //     //guarda Telefono y recupera ID
  //     let tel = {
  //       area: req.body.area,
  //       numero: req.body.numero,
  //     };
  //     let savedTel = await db.Telefonos.create(tel);
  //     let idTel = savedTel.dataValues.id;
  //     //guarda direccion y recupera ID
  //     let address = {
  //       calle: req.body.calle,
  //       nro: req.body.nro,
  //       piso: req.body.piso,
  //       of: req.body.of,
  //       id_ciudad: req.body.ciudad,
  //       cp: req.body.cp,
  //       id_provincia: req.body.provincia,
  //       id_pais: req.body.pais,
  //     };
  //     let savedAddress = await db.Direcciones.create(address);
  //     let idAdd = savedAddress.dataValues.id;
  //     // Crea Objeto USER  componiendo los ID
  //     let newUser = {
  //       nombre: req.body.userName,
  //       apellido: req.body.userLastName,
  //       email: req.body.userEmail,
  //       password: bcrypt.hashSync(req.body.userPassword, 10),
  //       id_telefono: idTel,
  //       id_direccion: idAdd,
  //       fecha_creacion: new Date(),
  //     };
  //     await db.Users.create(newUser);
  //     res.render("usersLogin", { auth: req.session.user });
  //   } else {
  //     res.render("usersCreate", {
  //       errors: errors.mapped(),
  //       oldData: req.body,
  //       auth: req.session.user,
  //     });
  //   }
  // },

  //verificando user para create
  store: async (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let user = await db.Users.findOne({
        where: { email: req.body.userEmail },
      });
      if (user) {
        let sector = db.Sectores.findAll();
        let ciudad = db.Ciudades.findAll();
        let provincia = db.Provincias.findAll();
        let pais = db.Paises.findAll();
        Promise.all([sector,ciudad, provincia, pais]).then(function ([
          sector,
          ciudades,
          provincias,
          paises,
        ]) {
          res.render("usersCreate", {
            sector:sector,
            ciudades: ciudades,
            provincias: provincias,
            paises: paises,
            error: "El usuario ya existe",
            oldData: req.body,
            auth: req.session.user,
          });
        });
      } else {
        //guarda Telefono y recupera ID
        let tel = {
          area: req.body.area,
          numero: req.body.numero,
        };
        let savedTel = await db.Telefonos.create(tel);
        let idTel = savedTel.dataValues.id;
        //guarda direccion y recupera ID
        let address = {
          calle: req.body.calle,
          nro: req.body.nro,
          piso: req.body.piso,
          of: req.body.of,
          id_ciudad: req.body.ciudad,
          cp: req.body.cp,
          id_provincia: req.body.provincia,
          id_pais: req.body.pais,
        };
        let savedAddress = await db.Direcciones.create(address);
        let idAdd = savedAddress.dataValues.id;
        // Crea Objeto USER  componiendo los ID
        let newUser = {
          nombre: req.body.userName,
          apellido: req.body.userLastName,
          email: req.body.userEmail,
          password: bcrypt.hashSync(req.body.userPassword, 10),
          id_sector: req.body.userSector,
          id_telefono: idTel,
          id_direccion: idAdd,
          fecha_creacion: new Date(),
        };
        console.log(newUser)
        await db.Users.create(newUser);
        res.render("usersLogin", { auth: req.session.user });
      }
    } else {
      res.render("usersCreate", {
        errors: errors.mapped(),
        oldData: req.body,
        auth: req.session.user,
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/users/login");
  },
};

// Exportar modulo
module.exports = userController;
