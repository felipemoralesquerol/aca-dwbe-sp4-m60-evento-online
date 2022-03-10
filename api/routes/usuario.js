const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const Controller = require('../controllers/usuarioController');

router.get(
  '/api/usuarios',
  authController.authenticated,
  authController.isAdmin,
  Controller.list
);

router.get(
  '/api/usuarios/:id',
  authController.authenticated,
  authController.isAdmin,
  Controller.list
);

router.get(
  '/api/usuarios/:id/pedidos',
  authController.authenticated,
  Controller.pedidos
);

router.post(
  '/api/usuarios/defaultData',
  Controller.agregarDefaultData
);

router.delete(
  '/api/usuarios/:id',
  authController.authenticated,
  authController.isAdmin,
  Controller.borrado
);

module.exports = router;
