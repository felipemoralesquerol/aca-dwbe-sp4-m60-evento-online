const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;
const httpMessage = require('../helpers/httpMessage');
const passwordManager = require('../helpers/passwordManager');

const UsuariosModel = require('../models/usuarios');

// TODO: Investigar si corresponde agregar mas campos
function getPayload (usuario) {
  return {
    email: usuario.email,
    username: usuario.username,
    admin: usuario.admin,
    usernameID: usuario.id
  };
}

// Login
exports.signin = async function signin (req, res, next) {
  try {
    const { email, password } = req.body;
    console.log('signin', email);

    // TODO: Sanitizar y validar la información ingresada

    const usuario = await UsuariosModel.findOne({
      where: { email: email, borrado: false }
    });

    if (!usuario) {
      httpMessage.NotFound('Credenciales incorrectas', res);
      return;
    }

    if (usuario.suspendido) {
      httpMessage.NotFound('Usuario suspendido', res);
      return;
    }

    // Armado de payload
    const payload = getPayload(usuario);

    const compare = passwordManager.comparePassword(password, usuario.password);
    if (compare) {
      const data = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
          if (err) {
            httpMessage.Error(req, res, err);
          } else {
            req.token = token;
            res.json({ status: 'signin', token });
          }
        }
      );
    } else {
      httpMessage.NotAccess(req, res);
    }
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

// Registro
exports.signup = async function signup (req, res, next) {
  try {
    // TODO: Sanetizar y validar la entrada
    const { username, password, email, nombre, direccion_envio, telefono } = req.body;
    console.log('signup', req.body);

    let usuario = await UsuariosModel.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }]
      }
    });
    if (usuario) {
      httpMessage.DuplicateData('Email y/o Username ya registrado!', res);
      return;
    };

    // Validar dureza de password

    req.body.password = passwordManager.encrypt(req.body.password);

    usuario = await UsuariosModel.create(req.body);

    // Armado de payload
    const payload = getPayload(usuario);

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          httpMessage.Error(req, res, err);
        } else {
          req.token = token;
          res.json({ status: 'signup', token });
        }
      }
    );
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

exports.authenticated = function authenticated (req, res, next) {
  // TODO: Implementar acceso a base de datos
  // NOTE: Requiere que la petición incluye en el campo headers una clave (key) de la forma
  //       Bearer {token}, donde este token haya sido suministrado por signin o signup
  try {
    if (!req.headers.authorization) {
      httpMessage.Denied(
        req,
        res,
        'Acceso denegado por falta de información de autorización'
      );
    } else {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
        if (err) {
          httpMessage.Denied(req, res, 'Acceso denegado: ' + err.message);
        } else {
          req.authData = authData;
          // TODO: Recuperar data del usuario
          console.log(req.authData);

          next();
        }
      });
    }
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

// Usuario es admin
exports.isAdmin = (req, res, next) => {
  if (req.authData.admin) {
    next();
  } else {
    console.error('Acceso denegado: ');
    res.status(403).send({ status: 'Acceso denegado' });
  }
};

// Perfil de usuario
exports.me = (req, res, next) => {
  res.json({ status: 'me', data: req.authData });
};

// Ususuario suspendido
exports.suspender = (req, res, next) => {
  res.status(500).json({ status: 'Opción no implementada aún!' });
};
