const mainController = {
  // para Produccion
  index: (req,res) => {
      res.redirect('/products')
  }

  // para test
  // index: (req, res) => {
  //   res.render("test");
  // },
};

module.exports = mainController;


