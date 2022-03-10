// Auth middleware that checks if the user is logged in
module.exports = {
  isLoggedIn (req, res, next) {
    console.log(req);
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ Mensaje: 'Usuario no autenticado' });
    }
  }
};
