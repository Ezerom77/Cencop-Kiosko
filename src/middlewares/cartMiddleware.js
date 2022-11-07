
let cartMiddleware = (req, res, next) => {
      if(req.session.cart === undefined){
        req.session.cart = [];}
      if(req.session.cartValue === undefined){
        req.session.cartValue = 0;};
      next();
      }


module.exports = cartMiddleware;