require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const db = require('./config/db');

const passport = require('passport');
const session = require('express-session');

require('./auth/passport-setup-google');
require('./auth/passport-setup-facebook');
require('./auth/passport-setup-linkedin');
const { isLoggedIn } = require('./middleware/isLoggedIn');

// Inicializacion del server
const app = express();

app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use(session({
  secret: process.env.APP_SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

const program = require('./routes/program.js');
app.use('/', program);

// Importación de rutas
const authRoutes = require('./routes/auth');

// Definición de rutas
app.use(authRoutes);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/failed', (req, res) => {
  console.log('Falla la loguearse');
  return res.status(401).json({ Mensaje: 'Falla al loguearse' });
});

// Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => console.log('Usuario autenticado')
);

app.get('/auth/google/callback', passport.authenticate('google',
  {
    failureRedirect: '/failed',
    successRedirect: '/home'
  }));

function logout (req, res, next) {
  req.logout();
  // TODO: Ver necesidad de ejecución de sentencia de abajo
  // delete req.session;
  next();
};

// Usada tanto para todos los passport
app.get('/auth/logout', logout, (req, res) => {
  console.log('logged out');
  res.status(200).redirect('/');
});

app.get('/auth/facebook',
  // passport.authenticate('facebook', { scope: ['user_friends'] })
  // TODO. Investir scopes!
  passport.authenticate('facebook')
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook',
    {
      failureRedirect: '/failed',
      successRedirect: '/home'
    }
  ));

app.get('/home', isLoggedIn, (req, res) => {
  console.log(req.user);
  return res.send({ Mensaje: `Bienvenido ${req.user.displayName}` });
}
);

app.get('/auth/linkedin',
  //, { scope: ['r_basicprofile', 'r_emailaddress'] }r_emailaddress
  passport.authenticate('linkedin', { scope: ['r_liteprofile', 'r_emailaddress'], credentials: 'include' })
);

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/failed',
    successRedirect: '/home'
  }
  )
);

// Activación de la app en modo escucha con los parametros de ambiente
app.listen(process.env.APP_PORT, function () {
  console.log(`Escuchando el puerto ${process.env.APP_PORT}!`);
  console.log(`Ejecución en http://localhost:${process.env.APP_PORT}`);
});
