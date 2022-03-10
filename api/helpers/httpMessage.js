module.exports = {
  Message (message, res) {
    // TODO: Enviar email
    // TODO: Enlazar error con tracking tool

    console.log('Mensaje interno: ' + message);
    res.status(200).send({ status: message });
  },

  Error (req, res, err) {
    // TODO: Enviar email
    // TODO: Enlazar error con tracking tool

    if (err.message.includes('Validation error')) {
      const auxError = 'Error interno: ' + err.message;
      console.error('Error interno: ' + err.message);
      res.status(409).send({ status: auxError }); // Conflicto
    } else {
      console.error('Error interno: ' + err.message);
      res.status(500).send({ status: 'Error interno.' });
    }
  },

  Denied (req, res, err) {
    // TODO: Enviar emails
    // TODO: Volcar esta información en un archivo de log
    // TODO: Internacionalizar (i18n)
    console.error(err);
    res
      .status(403)
      .send({ status: 'Acceso denegado o credenciales incorrectas.' });
  },

  NotAccess (req, res) {
    // TODO: Enviar emails
    // TODO: Volcar esta información en un archivo de log
    // TODO: Internacionalizar (i18n)
    console.error('Acceso denegado o no autorizado.');
    res.status(401).send({ status: 'Acceso denegado o no autorizado.' });
  },

  NotFound (message, res) {
    // TODO: Enviar emails
    // TODO: Volcar esta información en un archivo de log
    // TODO: Internacionalizar (i18n)
    console.error('Dato no encontrado : ' + message);
    res.status(404).send({ status: message });
  },

  DuplicateData (message, res) {
    // TODO: Enviar emails
    // TODO: Volcar esta información en un archivo de log
    // TODO: Internacionalizar (i18n)
    console.error('Dato duplicado : ' + message);
    res.status(409).send({ status: message });
  }
};
