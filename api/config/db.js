const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
    logging: function (str) {
      console.log(str);
    }
  },
);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log(process.env.DB_NAME, process.env.DB_FORCE);

    if (process.env.DB_FORCE === 'true') {
      console.log('Recreación de base de datos ...');
      await sequelize.sync({ force: true });
    };

    console.log("Conexión a la base de datos satisfactoriamente.");
    //const associations = require("./../api/models/associations/core");

  } catch (error) {
    console.error(
      "Se ha detectado un error al conectarse a la base de datos:",
      error
    );
  }
}

authenticate();

module.exports = sequelize;
